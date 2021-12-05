const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(12, function(err, salt) {
        if(err) {
            next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
