const combineRouters = require('koa-combine-routers');

const transactions = require('./transactions');
const accounts = require('./accounts');

const router = combineRouters(
    transactions,
    accounts,
);

module.exports = router;