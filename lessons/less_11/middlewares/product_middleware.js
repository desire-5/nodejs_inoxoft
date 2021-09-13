const { Product } = require('../dataBase');
const { productValidators } = require('../validators');
const ApiError = require('../error/ApiError');
const { statusCodesEnum } = require('../configs');

module.exports = {
    getProductByDynamicParam: (paramName, searchIn = 'body', dbFieldName = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const product = await Product.findOne({ [dbFieldName]: value });
            req.product = product;
            next();
        } catch (e) {
            next(e);
        }
    },
    isProductByIdExist: (req, res, next) => {
        try {
            const { product } = req;

            if (!product) {
                throw new ApiError(statusCodesEnum.NOT_FOUND, 'Product not found');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isValidProductData: (req, res, next) => {
        try {
            const { error, value } = productValidators.createProductValidator.validate(req.body);

            if (error) {
                throw new ApiError(statusCodesEnum.BAD_REQUEST, error.details[0].message);
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isValidProductDataUpd: (req, res, next) => {
        try {
            const { error, value } = productValidators.updateProductValidator.validate(req.body);

            if (error) {
                throw new ApiError(statusCodesEnum.BAD_REQUEST, error.details[0].message);
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

};
