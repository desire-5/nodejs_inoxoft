const jwt = require('jsonwebtoken');

const ApiError = require('../error/ApiError');
const { actionTypeEnum, statusCodesEnum, config } = require('../configs');

module.exports = {
    generateTokens: () => {
        const access_token = jwt.sign({}, config.ACCESS_TOKEN_SECRET, { expiresIn: '30min' });
        const refresh_token = jwt.sign({}, config.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET;

            jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError(statusCodesEnum.UNA, 'Invalid token');
        }
    },

    genereteActionToken: (actionType) => {
        let sol = '';
        switch (actionType) {
            case actionTypeEnum.FORGOT_PASS:
                sol = config.FORGOT_PASSWORD_TOKEN_SECRET;
                break;
            default:
                throw new ApiError(statusCodesEnum.SERVER_ERROR, 'Actiontype is wrong');
        }
        return jwt.sign({ actionType }, sol, { expiresIn: '7d' });
    },

    verifyActionToken: (actionType, token) => {
        let sol = '';
        switch (actionType) {
            case actionTypeEnum.FORGOT_PASS:
                sol = config.FORGOT_PASSWORD_TOKEN_SECRET;
                break;
            default:
                throw new ApiError(statusCodesEnum.SERVER_ERROR, 'token is not verify');
        }
        return jwt.verify(token, sol);
    }
};
