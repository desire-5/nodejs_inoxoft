const { User } = require('../dataBase');
const ApiError = require('../error/ApiError');
const userUtil = require('../utils/user.util');

module.exports = {
    getUserById: (req, res, next) => {
        try {
            const normalizedUser = userUtil.userNormalizator(req.user);
            res.json(normalizedUser);
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

    deleteUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user_del = await User.findOneAndDelete(user_id);

            res.json(user_del);
        } catch (e) {
            next(e);
        }
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
