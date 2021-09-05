module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/inoxoft',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access_tokem_secret',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '6134cf6c9094bd0e23395c28',
};
