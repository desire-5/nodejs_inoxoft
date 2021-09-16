const Joi = require('joi');

const createProductValidator = Joi.object({
    name: Joi.string().alphanum().min(3).max(30)
        .trim()
        .required(),
    image: Joi.string().alphanum().min(3).max(30)
        .trim(),
    price: Joi.number(),
    category: Joi.string().alphanum().min(3).max(30)
        .trim(),
    brand: Joi.string().alphanum().min(3).max(30)
        .trim(),
    description: Joi.string().alphanum().min(3).max(1000)
        .trim(),
    countInStock: Joi.number()
});

const updateProductValidator = Joi.object({
    _id: Joi.string(),
    name: Joi.string().min(3).max(30)
        .trim(),
    image: Joi.string().alphanum().min(3).max(30)
        .trim(),
    price: Joi.number(),
    category: Joi.string().alphanum().min(3).max(30)
        .trim(),
    brand: Joi.string().alphanum().min(3).max(30)
        .trim(),
    description: Joi.string().alphanum().min(3).max(1000)
        .trim(),
    countInStock: Joi.number()
});

module.exports = {
    createProductValidator,
    updateProductValidator,
};
