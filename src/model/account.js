const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const schema = Schema({
    address: { type: String, index: true },
    label: String,
    notes: String,
    isContract: { type: Boolean, default: false },
    firstSeen: { type: Date, index: -1 },
    lastSeen: { type: Date, index: -1 },
    balances: {
        ETH: Number,
        GUSD: Number,
    },
    contractInfo: {
        creatorAddress: String,
        transactionHash: String,
        timestamp: Number,
    },
    gusdTxs: { type: Number, default: 0 },
    tokens: { type: Array, default: [] },
});

schema.index({ address: 1 }, { unique: true });
schema.plugin(mongoosePaginate);

const Model = mongoose.model('Account', schema);

module.exports = Model;