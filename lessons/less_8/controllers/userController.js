const { User } = require('../dataBase');
const ApiError = require('../error/ApiError');
const { userUtil } = require('../utils');
const { emailService, passwordService } = require('../services');
const { emailActionsEnum, statusCodesEnum } = require('../configs');

module.exports = {
    getUserById: async (req, res, next) => {
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
                throw new ApiError(statusCodesEnum.NOT_FOUND, 'Users not found');
            }

            const normalizedUsers = data.map((user) => userUtil.userNormalizator(user));

            res.json(normalizedUsers);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user_del = await User.deleteOne({ _id: user_id });

            res.json(user_del);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const updatedUser = await User.findByIdAndUpdate(user_id, req.body, { new: true });
            res.json(userUtil.userNormalizator(updatedUser));
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashPassword = await passwordService.hash(password);
            const user = await User.create({ ...req.body, password: hashPassword });
            // .lean() // "message": "User.create(...).lean is not a function"
            // toJSON() - ok
            const normalizedUser = userUtil.userNormalizator(user);

            await emailService.sendMail(normalizedUser.email, emailActionsEnum.WELCOME, { userName: normalizedUser.name });
            res.status(statusCodesEnum.CREATE).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },
};
