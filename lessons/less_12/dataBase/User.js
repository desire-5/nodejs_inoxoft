const { Schema, model } = require('mongoose');
const { dbEntityEnum, userRolesEnum } = require('../configs');
// const { passwordService } = require('../services');

const userSchema = new Schema({
    avatar: {
        type: String
    },
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
    age: {
        type: Number,
        default: 18
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // select: false // use userNormalizator
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.virtual('name_role').get(function() {
    return `${this.name} ${this.role}`;
});

// userSchema.methods = { // for single record // THIS - RECORD
//     validatePassword(password) {
//         return passwordService.compare(password, this.password);
//     }
// };

// userSchema.statics = { // for schema // THIS - SCHEMA
//     async createWithHashPassword(userObject) {
//         const hashPassword = await passwordService.hash(userObject.password);

//         return this.create({ ...userObject, password: hashPassword });
//     }
// };
module.exports = model(dbEntityEnum.USER, userSchema);
