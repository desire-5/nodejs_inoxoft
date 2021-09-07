const { Schema, model } = require('mongoose');

const { dbEntityEnum } = require('../configs');

const orderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: dbEntityEnum.USER, required: true },
    isPaid: {
        type: Boolean,
        default: false,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = model(dbEntityEnum.ORDER, orderSchema);
