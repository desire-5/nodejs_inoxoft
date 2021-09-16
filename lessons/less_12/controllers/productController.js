const { Product } = require('../dataBase');
const ApiError = require('../error/ApiError');
const statusCodesEnum = require('../configs/statusCodes.enum');
const { productService } = require('../services');

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            //const { limit, page } = req.query;
            //const count_products = await Product.find().count();
            //const products = await Product.find().limit(+limit).skip((page - 1) * limit);
            const resp = await productService.findAll(req.query);
            if (!resp) {
                throw new ApiError(statusCodesEnum.NOT_FOUND, 'Products not found');
            }
            res.json({ ...resp });
            next();
        } catch (e) {
            next(e);
        }
    },

    getProductById: async (req, res, next) => {
        try {
            const { product_id } = req.params;
            console.log("___*__");
            console.log(product_id);
            
            
            const product = await Product.findOne({product_id});
            console.log("_)_)_)");
            console.log(product);
            
            
            console.log(product);
            
            res.json(product);
        } catch (e) {
            next(e);
        }
    },

    deleteProductById: async (req, res, next) => {
        try {
            const { product_id } = req.params;

            const product_del = await Product.deleteOne({ _id: product_id });

            res.json(product_del);
        } catch (e) {
            next(e);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const { product_id } = req.params;

            const updatedProduct = await Product.findByIdAndUpdate(product_id, req.body, { new: true });
            res.json(updatedProduct);
        } catch (e) {
            next(e);
        }
    },

    createProduct: async (req, res, next) => {
        try {
            const product = await Product.create({ ...req.body });

            res.status(statusCodesEnum.CREATE).json(product);
        } catch (e) {
            next(e);
        }
    },
};
