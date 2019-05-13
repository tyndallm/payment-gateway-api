const _ = require('lodash');

module.exports = {
  bugsnag: {
    token: _.get(process.env, 'BUGSNAG_TOKEN', null),
  },
  database: {
    connectionString: process.env.CONNECTION_STRING,
  },
  web3: {
    endpoint: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    networkId: 1,
  },
  port: process.env.PORT || 3001,
};