import { useState } from "react";
import Web3 from "web3";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [network, setNetwork] = useState("");

  const checkMetaMaskConnection = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const bal = await web3.eth.getBalance(accounts[0]);
        const ethBalance = web3.utils.fromWei(bal, "ether");
        setBalance(ethBalance);
        const networkId = await web3.eth.net.getId();
        setNetwork(networkId.toString());
      } catch (err) {
        console.error("Error connecting to MetaMask", err);
      }
    }
  };

  return (
    <div className="app">
      <h3> wallet address: {account}</h3>
      <h3> wallet balance: {balance}</h3>
      <h3>network Id: {network}</h3>
      <button type="button" onClick={() => checkMetaMaskConnection()}>
        Connect MetaMask
      </button>
    </div>
  );
}

export default App;
