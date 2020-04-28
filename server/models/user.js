const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        require: "First name is required"
    },
    lastName: {
        type: String,
        require: "Last name is required"
    },
    password: {
        type: String,
        require: "password is required"
    },
    email: {
        type: String,
        unique: true,
        require: "email is required"
    },
    bio: {
        type: String,
    },
    avatar: {
        type: String,
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;