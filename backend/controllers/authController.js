const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const passport = require('../config/passport.config');

const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

exports.signup = async (req, res) => {
    const { email, username, fullname, password } = req.body;
    console.log(
        '🚀 ~ file: authController.js:21 ~ exports.signup= ~ req.body',
        req.body
    );
    try {
        const newUser = await User.create({
            username,
            email,
            password,
            fullname,
        });
        res.status(201).json({
            status: 'success',
            data: {
                newUser,
            },
        });
    } catch (error) {
        console.log(
            '🚀 ~ file: authController.js:39 ~ exports.signup= ~ error',
            error
        );
        res.status(400).json({
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
    if (req.user) return next();
    if (req.cookies.jwt) {
        const decoded = jwt.decode(req.cookies.jwt, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: 'error',
                message:
                    'The user belonging to this token does no longer exist',
            });
        }
        req.user = currentUser;
        return next();
    }
    return res.status(401).json({
        status: 'error',
        message: 'You are not logged in! Please login to get access.',
    });
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
