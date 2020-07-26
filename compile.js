const path =  require('path');
const fs = require('fs');
const solc = require('solc');

contractPath = path.resolve(__dirname,'contracts', 'Lottery.sol');
sourceCode = fs.readFileSync(contractPath,'utf8');

// solidity version 0.6.0 and after expects json input as described below
var input = {
    language: 'Solidity',
    sources: {
      'Lottery.sol': {
        content: sourceCode
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  }

// the output is also json so we have to parse it to read it
compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));
// ABI of demo.sol... [{},{},...]
// console.log((compiledCode).contracts['Lottery.sol'].Lottery.abi);
// Bytecode of demo.sol... string
// console.log((compiledCode).contracts['Lottery.sol'].Lottery.evm.bytecode.object)


const abi = (compiledCode).contracts['Lottery.sol'].Lottery.abi;
const bytecode = (compiledCode).contracts['Lottery.sol'].Lottery.evm.bytecode.object;

module.exports = {abi,bytecode};
