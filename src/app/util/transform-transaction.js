const _ = require('lodash');

const formatTokenAmount = require('../../tokens/format-token-amount');

const formatToken = token => ({
    address: token.address,
    name: token.name,
    symbol: token.symbol
});

const GUSD_TOKEN = {
    name: "Gemini Dollar",
    symbol: "GUSD",
    decimals: 2,
    address: "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd",
}

const transformTransaction = (transaction) => {

    const amount = formatTokenAmount(transaction.value, GUSD_TOKEN);

    return {
        blockNumber: transaction.blockNumber,
        id: transaction._id,
        date: transaction.date,
        from: transaction.from,
        to: transaction.to,
        transactionHash: transaction.transactionHash,
        amount,
        type: transaction.type,
        accountUpdated: transaction.accountUpdated,
    };
};

module.exports = transformTransaction;