import { makeAutoObservable } from "mobx";
import { Contract } from "../near/contract";
import { UserWallet } from "../near/wallet";
import { NearBalance, User } from "../types/contract-entities";

class Store {
  accountId: string | null = null;
  accountTotalHold: NearBalance | null = null;
  accountFreeHold: NearBalance | null = null;

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
      this.userState = await this.appContract.viewUserAccount(accountId);
    }
    this.isAppInit = true;
  }
  changeTheme = () => (this.isDarkTheme = !this.isDarkTheme);

  enableLoading = () => (this.isLoading = true);

  disableLoading = () => (this.isLoading = false);

  async login() {
    this.userWallet.signIn();
  }

  async logout() {
    this.enableLoading();

    this.userWallet.signOut();
    this.isSignedIn = false;

    this.disableLoading();
  }
}

let store = new Store();

export default makeAutoObservable(store);
