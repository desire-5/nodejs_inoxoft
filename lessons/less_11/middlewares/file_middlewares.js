const ApiError = require('../error/ApiError');
const {
    constants: { MAX_AVATAR_SIZE, PHOTOS_MIMETYPES },
    errors: { BAD_REQUEST }
} = require('../configs');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar;

            if (!PHOTOS_MIMETYPES.includes(mimetype)) {
                // use cuctom status code
                throw new ApiError(
                    BAD_REQUEST.WRONG_FILE_FORMAT.status,
                    BAD_REQUEST.WRONG_FILE_FORMAT.customCode,
                    name,
                    'Wrong file format'
                );
                // throw new ApiError(400, `Wrong file format ${name}`);
            }

            if (size > MAX_AVATAR_SIZE) {
                throw new ApiError(
                    BAD_REQUEST.FILE_IS_TOO_BIG.status,
                    BAD_REQUEST.FILE_IS_TOO_BIG.customCode,
                    name,
                    `File ${name} is too big`
                );
                // throw new ApiError(400, `File ${name} is too big`);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
