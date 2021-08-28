const { Schema, model } = require('mongoose');
const user_roles_enum = require('../configs/user_roles_enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: user_roles_enum.USER,
        enum: Object.values(user_roles_enum)
    }
}, { timestamps: true });

module.exports = model('user', userSchema);
