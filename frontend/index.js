import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App";

import { Contract } from "./src/near/contract";
import { UserWallet } from "./src/near/wallet";

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new UserWallet({
  createAccessKeyFor: process.env.CONTRACT_NAME,
});

// Abstract the logic of interacting with the contract to simplify your flow
const helloNEAR = new Contract({
  contractId: process.env.CONTRACT_NAME,
  walletToUse: wallet,
});

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

  ReactDOM.render(
    <App isSignedIn={isSignedIn} helloNEAR={helloNEAR} wallet={wallet} />,
    document.getElementById("root")
  );
};
