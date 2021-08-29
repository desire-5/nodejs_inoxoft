const { User } = require('../dataBase');
const ApiError = require('../error/ApiError');

module.exports = {
    getUserById: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const data = await User.find();

            if (!data) {
                throw new ApiError(404, 'Users not found');
            }

            res.json(data);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: (req, res) => {
        const { user_id } = req.params;

        res.json(user_id);
    },

    updateUser: async (req, res, next) => {
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

    createUser: async (req, res, next) => {
        try {
            const user = await User.create(req.body);

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },
};
