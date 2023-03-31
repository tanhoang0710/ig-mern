const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const details = {
            from: process.env.EMAIL_USER,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        await mailTransporter.sendMail(details);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = sendEmail;
