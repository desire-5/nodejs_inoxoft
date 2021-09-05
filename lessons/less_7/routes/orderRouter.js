const Router = require('express');

const orderControllers = require('../controllers/orderController');

const router = new Router();

router.get('/user/:user_id', orderControllers.getOrdersByUsersId);
router.get('/:order_id', orderControllers.getOrderById);
router.get('/', orderControllers.getAllOrders);
router.delete('/:order_id', orderControllers.deleteOrderById);
router.post('/', orderControllers.createOrder);
router.put('/', orderControllers.updateOrder);

module.exports = router;
