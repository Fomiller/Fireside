const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    firstName: {
        type: String,
        require: "First name is required"
    },
    lastName: {
        type: String,
        require: "Last name is required"
    },
    username: {
        type: String,
        require: "username is required"
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
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      ]
}, { toJSON: { virtuals: true } 
});

// Middleware to hash passwords
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);

module.exports = User;