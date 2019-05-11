const _  = require('lodash');
const Router = require('koa-router');

const Transaction = require('../../model/transaction');
const searchTransactions = require('../../transactions/search-transactions');
const transformTransaction = require('../util/transform-transaction');

const router = new Router({ prefix: '/transactions'});

const DEFAULT_LIMIT = 20;
const DEFAULT_PAGE = 1;
const MAX_LIMIT = 50;
const MAX_PAGE = Infinity;

router.get('/', async ({ request, response }, next) => {
    const { address } = request.query;
    const query = request.query.q;
    const page = _.clamp(
        _.toNumber(_.get(request, 'query.page', DEFAULT_PAGE)),
        1,
        MAX_PAGE,
    );

    const limit = _.clamp(
        _.toNumber(_.get(request, 'query.limit', DEFAULT_LIMIT)),
        1,
        MAX_LIMIT,
    );

    const transactions = await searchTransactions({
        address,
        page,
        limit,
        query,
    });

    response.body = {
        transactions: transactions.docs.map(transaction => transformTransaction(transaction)),
        limit: transactions.limit,
        page: transactions.page,
        pageCount: transactions.pages,
        total: transactions.total,
    };

    await next();
});

router.get('/:tx', async ({ params, response }, next) => {
    const transaction = await Transaction.find({ transactionHash: params.tx})

    if (transaction === null) {
        response.status = 404;
        await next();
        return;
    }

    response.body = transformTransaction(transaction);

    await next();
});

module.exports = router;