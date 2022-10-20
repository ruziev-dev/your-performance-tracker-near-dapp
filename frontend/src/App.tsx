import 'regenerator-runtime/runtime';
import '../assets/global.css';

import React from 'react';

import { Contract } from './near/contract';
import { UserWallet } from './near/wallet';


export type AppProps ={isSignedIn: boolean, helloNEAR: Contract, wallet: UserWallet}
export default function App({ isSignedIn, helloNEAR, wallet }: AppProps) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

  const [isLoading, setLoading] = React.useState(false);

 /*  // Get blockchian state once on component load
  React.useEffect(() => {
    helloNEAR.()
      .then(setValueFromBlockchain)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }, []); */

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <button  onClick={() => wallet.signIn()}>{valueFromBlockchain}</button>;
  }

  function changeGreeting(e) {
    e.preventDefault();
    setLoading(true);
    const { greetingInput } = e.target.elements;
    helloNEAR.addHoldingTokens(greetingInput.value)
    .then(console.log)
    .then(console.log)
      .finally(() => {
        setLoading(false);
      });
  }

  function addChallenge(){
    helloNEAR.addChallenge()
    .then((data)=>console.log("data:", data))
    .then((data)=>console.log("data2:", data))
    .finally(() => {
      setLoading(false);
    });
  }

  function viewMyData(){
    helloNEAR.viewUserAccount()
    .then((data)=>console.log("data:", data))
    .then((data)=>console.log("data2:", data))
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <>
    <button  onClick={() => wallet.signOut()}>{wallet.accountId}</button>
      <main className={isLoading ? 'please-wait' : ''}>
        <h1 className="font-mono uppercase text-primary mt-4 text-sm">
          The contract says: <span className="greeting">{valueFromBlockchain}</span>
        </h1>
        <form onSubmit={changeGreeting} className="change">
          <label>Change greeting:</label>
          <div>
            <input
              autoComplete="off"
              defaultValue={valueFromBlockchain}
              id="greetingInput"
            />
            <button>
              <span>Save</span>
              <div className="loader"></div>
            </button>
            
          </div>
        </form>

        <button onClick={addChallenge}>
              <span>add Challenge</span>
              <div className="loader"></div>
            </button>
        <button onClick={viewMyData}>
              <span>viewMyData</span>
              <div className="loader"></div>
            </button>
      </main>
    </>
  );
}
