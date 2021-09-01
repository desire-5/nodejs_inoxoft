const bcrypt = require('bcrypt');

const ApiError = require('../error/ApiError');

module.exports = {
    hash: (pass) => bcrypt.hash(pass, 10),
    compare: async (pass, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(pass, hashPassword);

        if (!isPasswordMatched) {
            throw new ApiError(400, 'Email or password is wrong');
        }
    }
};
