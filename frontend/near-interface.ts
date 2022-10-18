/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

import { utils } from "near-api-js";
import { Wallet } from "./near-wallet";

export class HelloNEAR {
  contractId: string;
  wallet: Wallet;
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getGreeting() {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "add_challenge",
      args: {},
    });
  }

  async setGreeting(depositData: string) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "add_user_holding_tokens",
      args: {},
      deposit: utils.format.parseNearAmount(depositData) || "",
    });
  }
}
