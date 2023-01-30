const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');

const userRouter = require('./routes/userRoutes');

const app = express();

// 1) Global Middleware
// Serving static file
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

// Set security HTTP headers
app.use(helmet());

// Developement logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
    // max 100 requests each IP for 1 hour
    max: 100000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour',
});

app.use('/api', limiter);
app.use(cookieParser());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// multipart/form-data - dùng với muler

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(
    cookieSession({
        name: 'session',
        keys: ['tanhun'],
        maxAge: 24 * 60 * 60 * 100,
    })
);
// use passport
app.use(passport.initialize());
app.use(passport.session());

// 3) Routes
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    console.log(`Can't find ${req.originalUrl} on this server`);

    next();
});

// express tu biet day la error handling middleware, vi là middleware 4 tham số
app.use((err, req, res, next) => {
    console.log(err);
});

module.exports = app;
