const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const { resolve, join } = require("path");

const { PORT } = require('./configs/config');
const Db = require("./utils/db");

const app = express();
const staticPath = join(__dirname, 'static');

const usersPath = resolve(
    __dirname,
    'dataBase',
    'users.json'
  );
  console.log(usersPath);
  const USERS = new Db(usersPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

app.get('/user/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const user = await USERS.find(user_id);
    res.json(user);
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    const user = await USERS.find_email(email);
    if (!user) {
        res.redirect('/register');
        return;
    }
    const users = await USERS.list();
    res.render('users', {user:user.email, users});
});

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try{
        const data = await USERS.create({ email, password });
        res.render('success_register');
    } catch (err){
        console.log(err);
    }
})

app.get('/users', async (req, res) => {

    const data = await USERS.list();
    res.render('users', {users:data});
});

app.listen(PORT, () => {
    console.log('App listen', PORT);
});
