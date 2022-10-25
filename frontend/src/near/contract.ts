/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

import { utils } from "near-api-js";
import { Challange } from "../types/contract-entities";
import { UserWallet } from "./wallet";

export enum PROOF_TYPE {
  NONE = 0,
  TEXT = 1,
  MEDIA = 2,
}

export class Contract {
  contractId: string;
  wallet: UserWallet;
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async addChallenge(data: Challange) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "add_challenge",
      args: {
        args: {
          ...data,
          bet: utils.format.parseNearAmount(data.bet),
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
  async withdrawFreeHold(amount: string) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "withdraw_free_hold",
      args: { amount },
    });
  }
}
