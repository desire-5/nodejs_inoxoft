const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const { DB_CONNECT_URL, PORT } = require('./configs/config');

mongoose.connect(DB_CONNECT_URL);

global.TextEncoder = require('util').TextEncoder;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, orderRouter } = require('./routes');

app.use('/users', userRouter);
app.use('/orders', orderRouter);

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
