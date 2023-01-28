const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.set('strictQuery', false)

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down');
    console.log(err);
    process.exit(1);
});

dotenv.config({
    path: './.env',
});
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose
    // .connect(process.env.DATABASE_LOCAL, {
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connection successful!');
    }).catch(err => console.log(err));

// 4) Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLER REJECTION! Shutting down');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});