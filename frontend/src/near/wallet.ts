
import { providers } from "near-api-js";
import { setupModal } from "@near-wallet-selector/modal-ui";


import {
  NetworkId,
  setupWalletSelector,
  Wallet,
  WalletSelector,
} from "@near-wallet-selector/core";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

const THIRTY_TGAS = "30000000000000";
const NO_DEPOSIT = "0";

// Wallet that simplifies using the wallet selector
export class UserWallet {
  walletSelector: WalletSelector;
  wallet: Wallet | null;
  network: string;
  createAccessKeyFor: string | null;
  accountId: string | null;

  constructor({ createAccessKeyFor, network = "testnet" }) {
    this.createAccessKeyFor = createAccessKeyFor;
    this.network = network;
  }

  // To be called when the website loads
  async startAndCheckAuth() {
    this.walletSelector = await setupWalletSelector({
      network: this.network as NetworkId,
      modules: [
        setupMyNearWallet({ iconUrl: "https://luralink.com/uploads/img/channel/615da92fc4e001.77198631.png" }),
        setupLedger({ iconUrl: "https://flyclipart.com/thumbs/ledger-vault-logo-1278849.png" }), 
      ],
    });

    const isSignedIn = this.walletSelector.isSignedIn();

    if (isSignedIn) {
      this.wallet = await this.walletSelector.wallet();
      this.accountId =
        this.walletSelector.store.getState().accounts[0].accountId;
    }

    return {isSignedIn, accountId: this.accountId};
  }

  signIn() {
    const description = "Please select a wallet to sign in.";
    const modal = setupModal(this.walletSelector, {
      contractId: this.createAccessKeyFor as string,
      description,
      theme: "light"
      
    });
    modal.show();
  }

  signOut() {
    this.wallet?.signOut();
    this.wallet = this.accountId = this.createAccessKeyFor = null;
    window.location.replace(window.location.origin + window.location.pathname);
  }

  async viewMethod({ contractId, method, args = {} }) {
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    let res = await provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });
    return JSON.parse(Buffer.from(res.result).toString());
  }

  async callMethod({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }) {
    return await this.wallet?.signAndSendTransaction({
      signerId: this.accountId as string,
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });
  }

  // Get transaction result from the network
  async getTransactionResult(txhash) {
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, "unnused");
    return providers.getTransactionLastResult(transaction);
  }
}
