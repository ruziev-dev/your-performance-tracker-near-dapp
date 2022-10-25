import { connect, keyStores, providers } from "near-api-js";
import {
  setupModal,
  WalletSelectorModal,
} from "@near-wallet-selector/modal-ui";

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
const LOGIN_DESCRIPTION = "Please select a wallet to sign in.";

// Wallet that simplifies using the wallet selector
export class UserWallet {
  walletSelector: WalletSelector;
  wallet: Wallet | null;
  network: string;
  createAccessKeyFor: string | null;
  accountId: string | null;
  modal: WalletSelectorModal;

  constructor({ createAccessKeyFor, network = "testnet" }) {
    this.createAccessKeyFor = createAccessKeyFor;
    this.network = network;

    /* this.modal = setupModal(this.walletSelector, {
      contractId: this.createAccessKeyFor as string,
      description: LOGIN_DESCRIPTION,
    }); */
  }

  // To be called when the website loads
  async startAndCheckAuth() {
    this.walletSelector = await setupWalletSelector({
      network: this.network as NetworkId,
      modules: [setupMyNearWallet(), setupLedger()],
    });

    const isSignedIn = this.walletSelector.isSignedIn();

    if (isSignedIn) {
      this.wallet = await this.walletSelector.wallet();
      this.accountId =
        this.walletSelector.store.getState().accounts[0].accountId;
    }

    return { isSignedIn, accountId: this.accountId };
  }

  showWalletsModal = () => {
    this.modal = setupModal(this.walletSelector, {
      contractId: this.createAccessKeyFor as string,
      description: LOGIN_DESCRIPTION,
    });
    this.modal.show();
  };

  hideWalletsModal = () => this.modal.hide();

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

  async getAccountBalance() {
    const { network } = this.walletSelector.options;

    const connectionConfig = {
      networkId: this.network,
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: network.nodeUrl,
      headers: {},
    };

    const nearConnection = await connect(connectionConfig);
    let account = await nearConnection.account(this.accountId as string);

    return account.getAccountBalance();
  }

  async getTransactionResult(txhash) {
    const { network } = this.walletSelector.options;

    let a = await this.walletSelector.wallet();

    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const transaction = await provider.txStatus(txhash, "unnused");
    return providers.getTransactionLastResult(transaction);
  }
}
