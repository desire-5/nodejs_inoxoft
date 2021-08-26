const { resolve, join } = require("path");

const Db = require("./utils/db");

const usersPath = resolve(
    __dirname,
    'dataBase',
    'users.json'
  );

const USERS = new Db(usersPath);

module.exports =  USERS 
