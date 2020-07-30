import web3 from './web3';
import Lottery from './contract/Lottery.json';
console.log(Lottery.abi);
const contractAddress = '0xfAeDeaAE65B8c0aEcabE6306cB155466D8335A05';
export default new web3.eth.Contract(Lottery.abi,contractAddress);