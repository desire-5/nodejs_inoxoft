const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: {
        type: Boolean,
        default: false,
    },
    totalSumm: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = model('order', postSchema);
