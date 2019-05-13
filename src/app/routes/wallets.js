const _  = require('lodash');
const Router = require('koa-router');

const Wallet = require('../../model/wallet');
const createWallet = require('../../wallet/create-wallet');

const router = new Router({ prefix: '/wallets'});

router.get('/', async ({ request, response }, next) => {

    const wallet = await Wallet.findOne({});
    response.body = {
        address: wallet.address
    };

    await next();
});

router.post('/create', async ({ request, response }, next) => {
    // create new wallet
    let result = await createWallet();
    response.body = { walletAddress: result.address };

    await next();
});

module.exports = router;