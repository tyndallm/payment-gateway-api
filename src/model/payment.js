const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = Schema({
    orderId: { type: String, index: true },
    receivingAddress: { type: String, index: true },
    blockNumber: Number,
    receivedAt: { type: Date, index: -1 },
    from: String,
    amount: Number,
    method: { type: String },
    roundedDates: {
        day: { type: Date, index: -1 },
        halfHour: { type: Date, index: -1 },
        hour: { type: Date, index: -1 },
        minute: { type: Date, index: -1 },
    },
    orderUpdated: { type: Boolean, index: true, default: false },
    complete: { type: Boolean, index: true, default: false },
    transactionHash: { type: String, index: true },
    transaction: { type: Schema.Types.Mixed },
});

schema.index({ orderId: 1, transactionHash: 1 }, { unique: true });

const Model = mongoose.model('Payment', schema);

module.exports = Model;