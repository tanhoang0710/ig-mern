const crypto = require('crypto');
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
        enum: ['normal', 'admin'],
        default: 'normal',
        // select: false,
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

// Chaỵ ngay trước khi a document đc save
userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    // Trừ 1s vì có lúc lưu vào DB sẽ chậm hơn lúc đổi mật khẩu
    // phòng nếu trường hợp check login mà có check changePasswordAfter thì sẽ ko đăng nhập đc
    // vì thời gian đổi mật khẩu sẽ sau thời thời gian của jwt
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.createPasswordResetToken = function () {
    // Tạo ra password reset token nhưng khi lưu vào db cần mã hóa và có thời gian hết hạn
    const resetPasswordToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetPasswordToken)
        .digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 10000;

    return resetPasswordToken;
};

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = User;
