const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const schema = Schema({
    referenceId: { type: String, index: true },
    createdAt: { type: Date, index: -1 },
    status: { type: String, index: true, default: "pending" },
    details: { type: Schema.Types.Mixed },
    payment: { type: Schema.Types.Mixed },
    type: String,
    paymentReceived: { type: Boolean, default: false },
});

schema.index({ referenceId: 1 }, { unique: true });
schema.plugin(mongoosePaginate);

const Model = mongoose.model('Order', schema);

module.exports = Model;