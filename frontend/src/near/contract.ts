/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

import { utils } from "near-api-js";
import { UserWallet } from "./wallet";

export class Contract {
  contractId: string;
  wallet: UserWallet;
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async addChallenge() {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "add_challenge",
      args: {
        args: {
          group_uuid: "1223456",
          uuid: "42352",
          name: "Name 1",
          bet: utils.format.parseNearAmount("2"),
          expiration_date: new Date().toUTCString(),
        },
      },
    });
  }
  async viewUserAccount(account: string) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_user_account",
      args: { account_name: account },
    });
  }

  async addHoldingTokens(depositData: string) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "add_user_holding_tokens",
      args: {},
      deposit: utils.format.parseNearAmount(depositData) || "",
    });
  }
}
