const combineRouters = require('koa-combine-routers');

const wallets = require('./wallets');
const orders = require('./orders');

const router = combineRouters(
    wallets,
    orders,
);

module.exports = router;