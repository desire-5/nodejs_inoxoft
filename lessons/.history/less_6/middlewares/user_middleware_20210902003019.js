const { User } = require('../dataBase');

const { userValidators } = require('../validators');
const ApiError = require('../error/ApiError');
const {
    BAD_REQUEST, CONFLICT, FORBIDEN, NOT_FOUND
} = require('../configs/statusCodes.enum');

module.exports = {
    isMailExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userEmail = await User.findOne({ email: email.trim() }).lean();

            if (userEmail) {
                throw new ApiError(CONFLICT, 'Email is already exist');
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

            if (!user) {
                throw new ApiError(NOT_FOUND, 'User not found');
            }
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    // isAdmin: (req, res, next) => {
    //     try {
    //         if (req.user && req.user.role === 'admin') {
    //             next();
    //         }
    //         throw new ApiError(403, 'You are not admin');
    //     } catch (e) {
    //         next(e);
    //     }
    // },
    checkUserRole: (rolesArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!rolesArr.length) {
                return next();
            }

            if (!rolesArr.includes(role)) {
                throw new ApiError(FORBIDEN, 'Access forbiden');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn, dbFieldName = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const user = await User.findOne({ [dbFieldName]: value });
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isValidUserData: (req, res, next) => {
        try {
            const { error, value } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new ApiError(BAD_REQUEST, error.details[0].message);
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isValidUserDataUpd: (req, res, next) => {
        try {
            const { error, value } = userValidators.updateUserValidator.validate(req.body);

            if (error) {
                throw new ApiError(BAD_REQUEST, error.details[0].message);
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

};
