import Web3 from 'web3';

let web3;
const getWeb3 =  async() => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
    } else {
        web3 = new Web3(window.web3.currentProvider);
    }
    await window.ethereum.enable();
}
getWeb3();
export default web3;
