const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

require('dotenv').config();

const app = express();
const { ALLOWED_ORIGIN, DB_CONNECT_URL, PORT } = require('./configs/config');
const cronJobs = require('./cron');

mongoose.connect(DB_CONNECT_URL);

global.TextEncoder = require('util').TextEncoder;

app.use(cors({ origin: _configureCors }));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(helmet());

const {
    authRouter, userRouter, orderRouter,
    productRouter, userRouterApi, productRouterApi
} = require('./routes');

app.use('/api/users', userRouterApi);
app.use('/api/products', productRouterApi);
app.use('/api/orders', orderRouter);

app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);

app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen', PORT);
    cronJobs();
});

function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Unknown error'
        });
}

function _configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!origin) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
}
