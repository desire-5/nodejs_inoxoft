const express = require('express');
const mongoose = require('mongoose');

const { PORT } = require('./configs/config');

mongoose.connect('mongodb://localhost:27017/inoxoft');

const app = express();
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
