const _ = require('lodash');
const shortid = require('shortid');

const Order = require('../model/order');
const Wallet = require('../model/wallet');
const createWallet = require('../wallet/create-wallet');

const createOrder = async (order) => {
    
    // TODO validate & sanitize order

    // const wallet = await Wallet.findOne();
    const wallet = await createWallet();
    
    // get current wallet
    let payment = {
        address: wallet.address,
        method: "ETH",
        amount: 0.001
    }

    let newOrder = {
        referenceId: shortid.generate(),
        createdAt: new Date(),
        details: order.details,
        payment,
        paymentReceived: false,
    }

    let options = {
        setDefaultsOnInsert: true,
    }

    let result = await Order.collection.insert(newOrder, options);
    
    // todo add error checking

    return {
        referenceId: newOrder.referenceId,
        payment: newOrder.payment
    }
};

module.exports = createOrder;