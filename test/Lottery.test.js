const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {abi,bytecode} = require('../compile');

let accounts;
let lottery;

beforeEach('Deploys Lottery contracts', async() => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(abi)
            .deploy({data:bytecode}).send({from:accounts[0], gas:'1000000'});
})

describe('Test Lottery contract using Unit tests', () => {
    it('deploys the contract', () => {
        assert.ok(lottery.options.address);
    })

    it('player 1 enters the game successfully', async() => {

        await lottery.methods.enter().send({
            from:accounts[1],
            value: web3.utils.toWei('3', 'ether')
        });

        players = await lottery.methods.getGamersList().call({
            from:accounts[0]
        });

        contractMoney = await lottery.methods.getLotterWinnigAmount().call();

        assert.equal(accounts[1], players[0]);
        assert.equal(1, players.length);
        assert.equal(3, contractMoney/10**18);
    })

    it('denies manager from playing the game', async() => {
        try {
            await lotter.methods.enter().send({
                from:accounts[0],
                value: web3.utils.toWei('2','ether')
            });
            assert(false);
        } catch(err) {
            assert(err);
        }
    })
})