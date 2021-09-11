const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');

require('dotenv').config();

const app = express();
const { DB_CONNECT_URL, PORT } = require('./configs/config');

mongoose.connect(DB_CONNECT_URL);

global.TextEncoder = require('util').TextEncoder;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

const {
    authRouter, userRouter, orderRouter,
    userRouterApi, productRouterApi
} = require('./routes');

app.use('/api/users', userRouterApi);
// app.use('/api/products', productRouterApi);
app.use('/api/orders', orderRouter);

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Unknown error'
        });
}
