const { User } = require('../dataBase');
const ApiError = require('../error/ApiError');

module.exports = {
    getOrderById: (req, res, next) => {
        try {
            res.json(req.order);
        } catch (e) {
            next(e);
        }
    },

    getAllOrders: (req, res) => {
        try {
            const { user_id } = req.params;

            res.json(user_id);
        } catch (e) {
            res.json({ message: e.message });
        }
    },

    deleteOrderById: (req, res) => {
        const { user_id } = req.params;

        res.json(user_id);
    },

    createOrder: async (req, res, next) => {
        try {
            const user = await User.create(req.body);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    updateOrder: async (req, res, next) => {
        try {
            const post = req.body;
            if (!post._id) {
                throw new ApiError(404, 'User not found');
            }

            const updatedUser = await User.findByIdAndUpdate(post._id, post, { new: true });
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },
};
