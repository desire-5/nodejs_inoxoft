const { User } = require('../dataBase');

const ApiError = require('../error/ApiError');

module.exports = {
    isMailExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userEmail = await User.findOne({ email: email.trim() });

            if (!userEmail) {
                throw new ApiError(409, 'Email is already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);
            console.log('11111', user);
            if (!user) {
                throw new ApiError(404, 'User not found');
            }
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }

};
