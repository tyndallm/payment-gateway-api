const _  = require('lodash');
const Router = require('koa-router');

const Account = require('../../model/account');
const searchAccounts = require('../../accounts/search-accounts');
const transformAccount = require('../util/transform-account');

const router = new Router({ prefix: '/accounts'});

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

    const accounts = await searchAccounts({
        address,
        page,
        limit,
        query,
    });

    response.body = {
        accounts: accounts.docs.map(account => transformAccount(account)),
        limit: accounts.limit,
        page: accounts.page,
        pageCount: accounts.pages,
        total: accounts.total,
    };

    await next();
});

router.get('/:address', async ({ params, response }, next) => {
    const account = await Account.find({ address: params.address})

    if (account === null) {
        response.status = 404;
        await next();
        return;
    }

    response.body = transformAccount(account);

    await next();
});

module.exports = router;