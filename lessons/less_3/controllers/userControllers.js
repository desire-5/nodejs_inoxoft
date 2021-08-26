const ApiError = require('../error/ApiError');
const USERS = require("../db_connect");

module.exports = {

    getUserById:  async (req, res) => {
        const { user_id } = req.params;
        const user = await USERS.find(user_id);
        res.json(user);
    },

    getAllUsers: async (req, res) => {
        const data = await USERS.list();
        res.render('users', {users:data});
    },

   
   
};
