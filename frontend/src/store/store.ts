import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable, configure } from "mobx";
import { AccountBalance } from "near-api-js/lib/account";
import { Contract } from "../near/contract";
import { UserWallet } from "../near/wallet";
import { Challenge, User } from "../types/contract-entities";
import { INewChallenge } from "../types/frontend-types";
import { showAlertGlobal } from "../ui/views/AlertProvider";

configure({
  enforceActions: "never",
});

class Store {
  accountId: string | null = null;
  accountBalance: AccountBalance | null = null;

  private userWallet: UserWallet;
  private appContract: Contract;

  isSignedIn = false;
  isLoading = false;
  isAppInit = true;
  isDarkTheme = true;

  userState: User | null = null;

  constructor() {
    this.userWallet = new UserWallet({
      createAccessKeyFor: process.env.CONTRACT_NAME,
    });

    this.appContract = new Contract({
      contractId: process.env.CONTRACT_NAME,
      walletToUse: this.userWallet,
    });
  }

  async initApp() {
    const { isSignedIn, accountId } = await this.userWallet.startAndCheckAuth();
    this.isSignedIn = isSignedIn;
    this.accountId = accountId;
    if (accountId) {
      await this.updateUserState();
    }
    this.isAppInit = true;
  }

  async updateUserState() {
    this.userState = await this.appContract.viewUserAccount(
      this.accountId as string
    );
  }
  changeTheme = () => (this.isDarkTheme = !this.isDarkTheme);

  enableLoading = () => (this.isLoading = true);

  disableLoading = () => (this.isLoading = false);

  showWalletsModal = () => this.userWallet.showWalletsModal();

  hideWalletsModal = () => this.userWallet.hideWalletsModal();

  async getAccountBalance() {
    this.enableLoading();

    this.accountBalance = await this.userWallet.getAccountBalance();

    this.disableLoading();
  }

  async logout() {
    this.enableLoading();

    this.userWallet.signOut();
    this.isSignedIn = false;

    this.disableLoading();
  }
  async deposit(value: string) {
    this.enableLoading();
    try {
      await this.appContract.addHoldingTokens(value);
      await this.updateUserState();
    } catch (error) {
      console.log("[deposit]:", error);
      this.showErrorAlert(error.message);
    }
    this.disableLoading();
  }
  async withdraw(value: string) {
    this.enableLoading();
    try {
      await this.appContract.withdrawFreeHold(value);
      await this.updateUserState();
    } catch (error) {
      console.log("[withdraw]:", error);
      this.showErrorAlert(error.message);
    }

    this.disableLoading();
  }

  async createChallenge({ proofType, name, bet, expiration }: INewChallenge) {
    this.enableLoading();

    const newTask: Challenge = {
      group_uuid: uuidv4(),
      uuid: uuidv4(),
      name,
      expiration_date: expiration,
      bet,
      proof_type: proofType,
    };

    try {
      let result = await this.appContract.addChallenge(newTask);
      await this.updateUserState();
    } catch (error) {
      console.log("[createChallenge]:", error);
      this.showErrorAlert(error.message);
    }
    this.disableLoading();
  }
  async completeChallenge(uuid: string) {
    this.enableLoading();
    console.log("completeChallenge", uuid);
    try {
      let result = await this.appContract.completeChallenge(uuid);
      console.log("result", result);
      await this.updateUserState();
    } catch (error) {
      this.showErrorAlert(error.message);
      console.log("[completeChallenge]:", error);
    }
    this.disableLoading();
  }

  showErrorAlert(msg: string) {
    showAlertGlobal({
      type: "error",
      title: "Error",
      message: msg,
    });
  }

  showInfoAlert(msg: string) {
    showAlertGlobal({
      type: "info",
      title: "Info",
      message: msg,
    });
  }

  showWarnAlert(msg: string) {
    showAlertGlobal({
      type: "warning",
      title: "Warning",
      message: msg,
    });
  }

  openAccountInExplorer = () => {
    this.userWallet.openAccountInExplorer();
  };
}

let store = new Store();

export default makeAutoObservable(store);
