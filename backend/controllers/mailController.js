const nodemailer = require('nodemailer');
const mailController=require("../controllers/mailController")

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yasirkatib00@gmail.com',
    pass: 'myne qhkx kbbh uoyz',
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'yasirkatib00@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Function for sending email verification link
const sendVerificationEmail = (to, verificationLink) => {
  const subject = 'Verify Your Email';
  const text = `Click the following link to verify your email: ${verificationLink}`;
  sendEmail(to, subject, text);
};

// Function for sending order confirmation
const sendOrderConfirmation = (to, orderDetails) => {
  const subject = 'Order Confirmation';
  const text = `Thank you for your order! Order details: ${JSON.stringify(orderDetails)}`;
  sendEmail(to, subject, text);
};

module.exports = { sendVerificationEmail, sendOrderConfirmation ,sendEmail};
