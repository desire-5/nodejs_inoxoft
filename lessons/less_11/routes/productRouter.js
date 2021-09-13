const Router = require('express');

const { productMiddlewares } = require('../middlewares');
const productController = require('../controllers/productController');

const router = new Router();

router.use('/:product_id', productMiddlewares.getProductByDynamicParam('product_id', 'params', '_id'),
    productMiddlewares.isProductByIdExist);

router.get('/:product_id', productController.getProductById);
router.get('/', productController.getAllProducts);

module.exports = router;
