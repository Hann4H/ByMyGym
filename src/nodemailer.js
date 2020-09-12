const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "bemygym@gmail.com",
      pass: "BeMyGym123!"
    },
});

const mailOptions = {
    from: "bemygym@gmail.com",
    to: "bemygym@gmail.com",
    subject: 'Thanks for signing up',
    text:
        'email text goes here ',
};

module.exports = {
    transporter,
    mailOptions,
};