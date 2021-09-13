const { Schema, model } = require('mongoose');

const { dbEntityEnum } = require('../configs');

const productSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true, default: 0 },
    category: { type: String },
    brand: { type: String },
    description: { type: String },
    countInStock: { type: Number, required: true, default: 0 },

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = model(dbEntityEnum.PRODUCT, productSchema);
