const _ = require('lodash');

const Account = require('../model/account');

const searchAccounts = ({ address, limit, page, query }) => {
  let filter = {};

  if (_.isString(address)) {
    filter = {
      $or: [
        { address },
      ],
    };
  }

  return Account.paginate(filter, {
    sort: { lastSeen: -1 },
    limit,
    page,
  });
};

module.exports = searchAccounts;