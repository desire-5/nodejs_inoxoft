const { User } = require('../dataBase');
const ApiError = require('../error/ApiError');
const { userUtil } = require('../utils');
const { emailService, passwordService, s3Service, userService } = require('../services');
const { emailActionsEnum, statusCodesEnum } = require('../configs');


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
          
            // const { perPage, page } = req.query;
            // const data = await User.find().limit(+perPage).skip((page - 1) * perPage);
            // use service query
            const resp = await userService.findAll(req.query);

            if (!resp) {
                throw new ApiError(statusCodesEnum.NOT_FOUND, 'Users not found');
            }

            const normalizedUsers = resp.data.map((user) => userUtil.userNormalizator(user));

            res.json({...resp, data:normalizedUsers});
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
            let user = await User.create({ ...req.body, password: hashPassword });
            // .lean() // "message": "User.create(...).lean is not a function"
            // toJSON() - ok
            if (req.files && req.files.avatar) {
                const uploadFile = await s3Service.uploadImage(req.files.avatar, 'user', user._id);

                user = await User.findByIdAndUpdate(user._id, { avatar: uploadFile.Location }, { new: true });
            }
            const normalizedUser = userUtil.userNormalizator(user);

            await emailService.sendMail(normalizedUser.email, emailActionsEnum.WELCOME, { userName: normalizedUser.name });
            res.status(statusCodesEnum.CREATE).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },
};
