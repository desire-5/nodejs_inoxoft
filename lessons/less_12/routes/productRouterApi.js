const Router = require('express');

const { authMiddlewares, userMiddlewares, productMiddlewares } = require('../middlewares');
const productController = require('../controllers/productController');

const router = new Router();

router.use('/:product_id',
    authMiddlewares.checkAccessToken, userMiddlewares.checkUserRole(['admin'],
        productMiddlewares.getProductByDynamicParam('product_id', 'params', '_id'), productMiddlewares.isProductByIdExist));

router.use('/',
    authMiddlewares.checkAccessToken, userMiddlewares.checkUserRole(['admin']));

router.get('/:product_id', productController.getProductById);
router.get('/', productController.getAllProducts);
router.delete('/:product_id', productController.deleteProductById);
router.post('/', productController.createProduct);
router.put('/:product_id', productMiddlewares.isValidProductDataUpd, productController.updateProduct);

module.exports = router;
