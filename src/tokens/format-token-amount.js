const _ = require('lodash');
const { BigNumber } = require('@0xproject/utils');
const { Web3Wrapper } = require('@0xproject/web3-wrapper');

module.exports = (amount, token) => {
    if (_.get(token, 'decimals') === undefined) {
        return null;
    }

    amount = Math.abs(amount); // for genesis address

    const bigNumber = new BigNumber(amount.toString());

    return Web3Wrapper.toUnitAmount(bigNumber, token.decimals);
};