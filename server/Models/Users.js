const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Enforce unique email addresses
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"] // Restrict to these roles
    }
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
