const { Schema, model } = require('mongoose');

const postSchema = new Schema({
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
