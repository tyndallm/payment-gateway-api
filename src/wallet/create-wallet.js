const _ = require('lodash');
// const ethers = require('../util/ethereum/ethers');
const ethers = require('ethers');

const Wallet = require('../model/wallet');

const createWallet = async () => {

    let randomWallet = ethers.Wallet.createRandom();
    
    let wallet = {
        address: randomWallet.signingKey.address,
        privateKey: randomWallet.signingKey.privateKey,
        createdAt: new Date(),
        balances: {
            "ETH": 0,
            "WETH": 0,
            "DAI": 0,
            "GUSD": 0,
            "USDC": 0,
        },
        txCount: 0, // todo fix this
    }

    let result = await Wallet.collection.insert(wallet);

    return { address: wallet.address };
};

module.exports = createWallet;