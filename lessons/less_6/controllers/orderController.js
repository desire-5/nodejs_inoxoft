const { Order } = require('../dataBase');
const ApiError = require('../error/ApiError');

module.exports = {
    getOrderById: async (req, res, next) => {
        try {
            const { order_id } = req.params;
            const data = await Order.findById(order_id);

            if (!data) {
                throw new ApiError(404, 'Order not found');
            }

            res.json(data);
        } catch (e) {
            next(e);
        }
    },

    getOrdersByUsersId: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const data = await Order.find({ user_id });

            if (!data) {
                throw new ApiError(404, 'Orders not found');
            }

            res.json(data);
        } catch (e) {
            next(e);
        }
    },

    getAllOrders: async (req, res, next) => {
        try {
            const data = await Order.find();

            if (!data) {
                throw new ApiError(404, 'Order not found');
            }

            res.json(data);
        } catch (e) {
            next(e);
        }
    },

    deleteOrderById: async (req, res, next) => {
        try {
            const { order_id } = req.params;
            if (!order_id) {
                throw new ApiError(404, 'id not pass');
            }
            const order_del = await Order.findOneAndDelete(order_id);

            res.json(order_del);
        } catch (e) {
            next(e);
        }
    },

    createOrder: async (req, res, next) => {
        try {
            const order = await Order.create(req.body);

            res.status(201).json(order);
        } catch (e) {
            next(e);
        }
    },

    updateOrder: async (req, res, next) => {
        try {
            const post = req.body;
            if (!post._id) {
                throw new ApiError(404, 'Order not found');
            }

            const updatedOrder = await Order.findByIdAndUpdate(post._id, post, { new: true });
            res.json(updatedOrder);
        } catch (e) {
            next(e);
        }
    },
};
