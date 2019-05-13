const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = Schema({
    address: { type: String, index: true },
    createdAt: { type: Date, index: -1 },
    balances: { type: Schema.Types.Mixed },
    name: String,
    type: String,
    txCount: { type: Number, default: 0 },
});

const Model = mongoose.model('Wallet', schema);

module.exports = Model;