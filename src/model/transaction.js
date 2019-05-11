const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const schema = Schema({
    blockHash: String,
    blockNumber: Number,
    date: { type: Date, index: -1 },
    logIndex: { type: Number, index: true },
    from: String,
    to: String,
    value: Number,
    roundedDates: {
        day: { type: Date, index: -1 },
        halfHour: { type: Date, index: -1 },
        hour: { type: Date, index: -1 },
        minute: { type: Date, index: -1 },
    },
    accountUpdated: { type: Boolean, index: true, default: false },
    transactionHash: { type: String, index: true },
    type: { type: String, default: "transfer" },
});

schema.index({ logIndex: 1, transactionHash: 1 }, { unique: true });
schema.plugin(mongoosePaginate);

const Model = mongoose.model('Transaction', schema);

module.exports = Model;