const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        maxlength:50
    },
    email: {
        type:String,
        trim: true,
        unique: 1 
    },
    password: {
        type: String,
        minlength: 5
    }
});


UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema);


module.exports = User;