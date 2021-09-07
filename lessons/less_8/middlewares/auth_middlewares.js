const {
    constants,
    dbEntityEnum,
    statusCodesEnum,
} = require('../configs');
const ApiError = require('../error/ApiError');
const { jwtService } = require('../services');
const { OAuth } = require('../dataBase');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ApiError(statusCodesEnum.UNAUTHORIZED, 'No token');
            }

            await jwtService.verifyToken(token);

            const isToken = await OAuth.findOne({ access_token: token }).populate(dbEntityEnum.USER);

            if (!isToken) {
                throw new ApiError(statusCodesEnum.UNAUTHORIZED, 'Invalid token');
            }

            req.currentUser = isToken.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ApiError(statusCodesEnum.UNAUTHORIZED, 'No token');
            }

            await jwtService.verifyToken(token, 'refresh');

            const isToken = await OAuth.findOne({ refresh_token: token }).populate(dbEntityEnum.USER);

            if (!isToken) {
                throw new ApiError(statusCodesEnum.UNAUTHORIZED, 'Invalid token');
            }

            req.currentUser = isToken.user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
