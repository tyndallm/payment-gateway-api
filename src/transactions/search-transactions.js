const _ = require('lodash');

const Transaction = require('../model/transaction');

const searchTransactions = ({ address, limit, page, query }) => {
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

  return Transaction.paginate(filter, {
    sort: { date: -1 },
    limit,
    page,
  });
};

module.exports = searchTransactions;