const ApiError = require('../error/ApiError');
const USERS = require("../db_connect");
const { validateEmail } = require('../utils/valitation');

module.exports = {

    register:   async (req, res, next) => {
        const { email, password } = req.body;
    
        if (!validateEmail(email) || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }
        const user = await USERS.find_email(email);
        
        if (user) {
            return next(ApiError.badRequest('User with this email already exists'))
        }
        try{
            const data = await USERS.create({ email, password });
            res.render('success_register');
        } catch (err){
            console.log(err);
        }
    } 
};