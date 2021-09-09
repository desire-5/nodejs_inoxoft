const mongoose = require('mongoose');
const User = require('../dataBase/User');
const { DB_CONNECT_URL } = require('../configs/config');

mongoose.connect(DB_CONNECT_URL);

const users = [new User({
    name: 'admin',
    email: 'admin@admin.admin',
    password: 'admin123456789',
    role: 'admin'
})];

let done = 0;
for (let i = 0; i < users.length; i++) {
    users[i].save((err, res) => {
        done++;
        if (done === users.length) {
            exit();
        }
    });
}
function exit() {
    mongoose.disconnect();
}
