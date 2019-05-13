const _  = require('lodash');
const Router = require('koa-router');

const Order = require('../../model/order');
const searchOrders = require('../../orders/search-orders');
const createOrder = require('../../orders/create-order');
const transformOrder = require('../util/transform-order');

const router = new Router({ prefix: '/orders'});

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

    const orders = await searchOrders({
        address,
        page,
        limit,
        query,
    });

    response.body = {
        orders: orders.docs.map(order => transformOrder(order)),
        limit: orders.limit,
        page: orders.page,
        pageCount: orders.pages,
        total: orders.total,
    };

    await next();
});

router.get('/:id', async ({ params, response }, next) => {
    const order = await Order.find({ referenceId: params.id})

    if (order === null) {
        response.status = 404;
        await next();
        return;
    }

    response.body = transformOrder(order);

    await next();
});

router.post('/create', async ({ request, response }, next) => {
    // TODO sanitize data

    let result = await createOrder({ details: request.body });
    
    response.body = result;

    await next();
});


module.exports = router;