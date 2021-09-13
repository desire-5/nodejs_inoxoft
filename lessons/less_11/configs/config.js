module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/inoxoft',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access_tokem_secret',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '6134cf6c9094bd0e23395c28',
    FORGOT_PASSWORD_TOKEN_SECRET: process.env.FORGOT_PASSWORD || 'forgotpass',

    EMAIL_BROADCAST: process.env.EMAIL_BROADCAST || 'test@gmail.com',
    EMAIL_BROADCAST_PASS: process.env.EMAIL_BROADCAST_PASS || '12345',
    FRONTED_URL: process.env.FRONTED_URL || 'https://inoxoft.com',

    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:4200;http://localhost:3000',
};
