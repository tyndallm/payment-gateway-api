const _ = require('lodash');

const Order = require('../model/order');

const searchOrders = ({ address, limit, page, query }) => {
  let filter = {};

  if (_.isString(query)) {
    filter = {
      $or: [
        { transactionHash: query },
      ],
    };
  } else if (_.isString(address)) {
    filter = {
      $or: [
        { address },
      ],
    };
  }

  return Order.paginate(filter, {
    sort: { date: -1 },
    limit,
    page,
  });
};

module.exports = searchOrders;