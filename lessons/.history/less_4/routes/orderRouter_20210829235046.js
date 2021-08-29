const Router = require('express');

const orderControllers = require('../controllers/orderController');
const { isUserByIdExist } = require('../middlewares/user_middleware');

const router = new Router();

router.get('/:order_id', isUserByIdExist, orderControllers.getOrderById);
router.get('/', orderControllers.getAllOrders);
router.delete('/:order_id', orderControllers.deleteOrderById);

router.get('/user/:user_id', orderControllers.getOrdersByUsersId);

router.post('/', orderControllers.createOrder);
router.put('/', orderControllers.updateOrder);

module.exports = router;
