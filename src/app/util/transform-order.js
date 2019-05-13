const _ = require('lodash');

const formatTokenAmount = require('../../tokens/format-token-amount');

const formatToken = token => ({
    address: token.address,
    name: token.name,
    symbol: token.symbol
});

const transformOrder = (order) => {

    return {
        referenceId: order.referenceId,
        createdAt: order.createdAt,
        status: order.status,
        details: {
            platformId: order.details.platformId,
            identifier: order.details.identifier,
            report: order.details.report,
            email: order.details.email,
        },
        payment: {
            address: order.payment.address,
            amount: order.payment.amount,
            method: order.payment.method,
        },
    };
};

module.exports = transformOrder;