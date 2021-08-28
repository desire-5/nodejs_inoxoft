const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    author: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = model('post', postSchema);
