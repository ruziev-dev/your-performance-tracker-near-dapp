import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable, toJS } from "mobx";
import { AccountBalance } from "near-api-js/lib/account";
import { Contract } from "../near/contract";
import { UserWallet } from "../near/wallet";
import { Challange, User } from "../types/contract-entities";
import { IAlert, INewChallenge } from "../types/frontend-types";

const ALERT_TIME = 3000;

class Store {
  accountId: string | null = null;
  accountBalance: AccountBalance | null = null;

  private userWallet: UserWallet;
  private appContract: Contract;

  isSignedIn = false;
  isLoading = false;
  isAppInit = true;
  isDarkTheme = true;
  alertState: IAlert[] = [];

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
      //todo: show alert
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
      //todo: show alert
    }

    this.disableLoading();
  }

  async createChallenge({ proofType, name, bet, expiration }: INewChallenge) {
    this.enableLoading();

    const newTask: Challange = {
      group_uuid: uuidv4(),
      uuid: uuidv4(),
      name,
      expiration_date: expiration,
      bet,
      proof_type: proofType,
    };

    try {
      await this.appContract.addChallenge(newTask);
      await this.updateUserState();
    } catch (error) {
      console.log("[createChallenge]:", error);
      //todo: show alert
    }
    this.disableLoading();
  }

  //todo: make it private
  showAlert() {
    const newAlert: IAlert = {
      key: uuidv4(),
      message: "test msg",
      type: "error",
      title: `qweert ${new Date()}`,
    };

    console.log(toJS(this.alertState));
    this.alertState = this.alertState?.length
      ? [...this.alertState, newAlert]
      : [newAlert];
    console.log(this.alertState);

    setTimeout(() => {
      this.alertState = this.alertState.filter(
        (alertObj) => alertObj.key !== newAlert.key
      );
      console.log(this.alertState);
    }, ALERT_TIME);
  }
}

let store = new Store();

export default makeAutoObservable(store);
