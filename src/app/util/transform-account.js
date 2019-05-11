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

const transformAccount = (account) => {

    const balance = formatTokenAmount(account.balances.GUSD, GUSD_TOKEN);

    return {
        address: account.address,
        id: account._id,
        firstSeen: account.firstSeen,
        lastSeen: account.lastSeen,
        gusdTxs: account.gusdTxs,
        isContract: account.isContract,
        tokens: account.tokens,
        contractInfo: account.isContract ? account.contractInfo : {},
        balance,
    };
};

module.exports = transformAccount;