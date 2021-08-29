const { User } = require('../dataBase');

module.exports = {
    getOrderById: (req, res, next) => {
        try {
            res.json(req.user);
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
};
