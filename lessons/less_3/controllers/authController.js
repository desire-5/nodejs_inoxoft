const ApiError = require('../error/ApiError');
const USERS = require("../db_connect");
const { validateEmail } = require('../utils/valitation');

module.exports = {

    auth:  async (req, res, next) => {
        const { email, password } = req.body;

        if (!validateEmail(email) || !password) {
            return next(ApiError.badRequest('Incorrect email or password'));
        }
            
        const user = await USERS.find_email(email);

        if (!user) {
            res.redirect('/register');
            return;
        }
        const users = await USERS.list();
        res.render('users', {user:email, users});
    }   
};