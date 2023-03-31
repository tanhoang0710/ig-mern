const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const passport = require('../config/passport.config');
const sendEmail = require('../utils/email');

const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

exports.signup = async (req, res) => {
    const { email, username, fullname, password } = req.body;
    try {
        const newUser = await User.create({
            username,
            email,
            password,
            fullname,
        });
        await sendEmail({
            email: newUser.email,
            subject: 'Signin successfully!',
            message: `Dear ${newUser.fullname}, thank you for using my app.\n\n
            Login and using the following link to verify your email:\n\n
            ${req.protocol}://${req.get('host')}/api/v1/users/verify-email \n\n
            tanhun
            `,
        });
        return res.status(201).json({
            status: 'success',
            data: {
                newUser,
            },
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message:
                error.code === 11000 ? 'Username is existed!' : error.message,
        });
    }
};

exports.signin = async (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            if (err.message === 'Username or password is invalid')
                return res.status(400).json({
                    status: 'fail',
                    message: err.message,
                });
            return res
                .status(404)
                .json({ status: 'fail', message: err.message });
        }
        const token = signToken(user._id);
        const cookieOptions = {
            expires: new Date(
                Date.now() +
                    process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };

        res.cookie('jwt', token, cookieOptions);
        return res.status(200).json({
            status: 'success',
            token,
            user,
        });
    })(req, res, next);
};

exports.loginWithSocialSuccess = (req, res) => {
    if (req.user) {
        const { active, role, ...rest } = req.user;
        return res.status(200).json({
            status: 'success',
            user: rest,
            message: 'Login successfully!',
        });
    }
    return res.status(401).json({
        status: 'error',
        message: 'You are not authenticated!',
    });
};

exports.loginWithSocialFail = (req, res) => {
    res.status(401).json({
        status: 'error',
        message: 'You are not authenticated!',
    });
};

exports.loginWithGoogle = passport.authenticate('google', {
    scope: ['profile', 'email'],
    successRedirect: 'http://localhost:5173/login/success',
    failureRedirect: '/api/v1/users/login/failed',
});

exports.loginWithGithub = passport.authenticate('github', {
    scope: ['profile', 'email'],
    successRedirect: 'http://localhost:5173/login/success',
    failureRedirect: '/api/v1/users/login/failed',
});

exports.isAuthenticated = async (req, res, next) => {
    try {
        if (req.user) return next();
        if (req.cookies.jwt) {
            const decoded = jwt.decode(req.cookies.jwt, process.env.JWT_SECRET);
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return res.status(401).json({
                    status: 'fail',
                    message:
                        'The user belonging to this token does no longer exist',
                });
            }
            req.user = currentUser;
            return next();
        }
        return res.status(401).json({
            status: 'fail',
            message: 'You are not logged in! Please login to get access.',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.logout = (req, res) => {
    // cho dang nhap vs jwt bth
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 100 * 1000),
        httpOnly: true,
    });
    // cho dang nhap vs social
    req.logout();
    res.status(200).json({
        status: 'success',
        message: 'Logout successfully!',
    });
};

exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No users found with that ID!',
            });
        }
        user.emailVerified = true;
        await user.save();
        await sendEmail({
            email: user.email,
            subject: 'Verify email successfully!',
            message: `Dear ${user.fullname}, thank you for using my app.
            This email has been seen to inform that you verify your email successfully!\n\n
            tanhun
            `,
        });
        return res.status(200).json({
            status: 'success',
            user,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.retrictTo =
    (...roles) =>
    (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to perform this action!',
            });
        }
        next();
    };
