const express = require('express');
const expressHbs = require('express-handlebars');
const { join } = require("path");

const { PORT } = require('./configs/config');

const app = express();
const staticPath = join(__dirname, 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

const {registerRouter, userRouter, authRouter} = require('./routes');

app.use('/register', registerRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(PORT, () => {
    console.log('App listen', PORT);
});
