const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please tell us your fullname'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'A user must have a email'],
        trim: true,
        lowercase: true, // chuyển về thành chữ thường, ko phải validate
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    username: {
        type: String,
        required: [true, 'A user must have a username'],
        trim: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['normal', 'authenticated'],
        default: 'normal',
        select: false,
    },
    avatar: {
        type: String,
        default: 'default.jpg',
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        // select: false,
    },
    // passwordConfirm: {
    //     type: String,
    //     required: [true, 'Please confirm your password'],
    //     minlength: 6,
    //     validate: {
    //         // This only works on CREATE and SAVE!!!
    //         validator: function (el) {
    //             return el === this.password;
    //         },
    //         message: 'Passwords are not the same',
    //     },
    // },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false, // ko hiện thị ra khi query
    },
    bio: String,
    phoneNumber: {
        type: String,
        validate: [validator.isMobilePhone, 'Please provide a valid email'],
    },
    googleId: {
        type: String,
        default: '',
    },
    githubId: {
        type: String,
        default: '',
    },
});

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = User;
