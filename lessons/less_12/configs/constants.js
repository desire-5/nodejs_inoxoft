module.exports = {
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    AUTHORIZATION: 'Authorization',
    MAX_AVATAR_SIZE: 5 * 1024 * 1024,
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg'
    ],
    USER_PER_PAGE: 5,
    PRODUCT_PER_PAGE: 5,
};
