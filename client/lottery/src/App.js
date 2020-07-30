import React, { useState, useEffect, Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

function App() {
  const [manager, setManager] = useState('me');
  const [accounts, setAccounts] = useState([]);
  const [amount, setAmount] = useState(0.0);
  const [players, setPlayers] = useState([]);
  const [betAmt, setBetAmt] = useState(0.0);
  const [message, setMessage] = useState('Start the game');

  useEffect(() => {
    const start = async() => {
      const accts = await web3.eth.getAccounts();
      setAccounts(accts);
      console.log(accts);
      const mng = await lottery.methods.manager().call();
      console.log(mng);
      setManager(await lottery.methods.manager().call());

      const amt =  await web3.eth.getBalance(lottery.options.address);
      setAmount(amt);

      const gamers = await lottery.methods.getGamersList().call();
      setPlayers(gamers);
    }
    start();
  }, [])

  const enterGame = async(event) => {
    event.preventDefault();
    setMessage('Transaction begin, wait for few seconds...');
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(betAmt, 'ether')
    })
    setMessage('Yep, you are in the game now');
  }

  const announceResult = async(event) => {
    event.preventDefault();
    setMessage('Hold ur breath...');
    const winnerAdr = await lottery.methods.announceWinner().send({from:accounts[0]});
    console.log(winnerAdr);
    setMessage('And the winner is address' + winnerAdr);
  }

  return(
    <div>
      <h2>Lottery game</h2>
      <p>This game is managed by {manager}</p>
      <hr></hr>
  <p>You can fight for {web3.utils.fromWei(amount+'','ether')} ethers with these many {players.length} players</p>
  <hr></hr>
  <p>Wanna try? Enter the amount and play</p>
  <div>
    <form onSubmit={enterGame}>
      <label>Enter the amount in ether  </label><input onChange={(event) => {setBetAmt(event.target.value);console.log(betAmt)}} type="text" placeholder="in ether..."></input>
      <button>Play!</button>
    </form>
  </div>
  <h1>{message}</h1>
  <hr></hr>
  <div>
    <p>Only Manger Access!</p>
    <button onClick={announceResult}>Announce the winner</button>
  </div>
    </div>
  );

}

export default App;