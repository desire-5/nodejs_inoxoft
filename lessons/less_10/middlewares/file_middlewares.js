const ApiError = require('../error/ApiError');
const { constants: { MAX_AVATAR_SIZE, PHOTOS_MIMETYPES } } = require('../configs');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            const { avatar } = req.files;

            if (!avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = avatar;

            if (!PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ApiError(400, `Wrong file format ${name}`);
            }

            if (size > MAX_AVATAR_SIZE) {
                throw new ApiError(400, `File ${name} is too big`);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
