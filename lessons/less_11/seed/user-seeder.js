const mongoose = require('mongoose');
const User = require('../dataBase/User');
const { DB_CONNECT_URL } = require('../configs/config');
const { passwordService } = require('../services');

mongoose.connect(DB_CONNECT_URL);

const seedUsers = async () => {
    try {
        const usersCollection = await User.find();
        if (usersCollection.length > 1) {
            return;
        }
        let done = 0;
        const users = [new User({
            name: 'admin',
            email: 'admin@admin.admin',
            password: await passwordService.hash('admin123456789'),
            role: 'admin'
        })];
        for (let i = 0; i < users.length; i++) {
            users[i].save((err, res) => {
                done++;
                if (done === users.length) {
                    mongoose.disconnect();
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
};
seedUsers();
