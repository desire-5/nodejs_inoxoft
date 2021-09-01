const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: {
        type: Boolean,
        default: false,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = model('order', orderSchema);
