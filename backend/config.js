module.exports = {
    secretKey: 'mySuperSecretKey123',
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/E-Commerce',
    emailConfig: {
      service: 'Gmail',
      auth: {
        user: 'yasirkatib12@gmail.com',
        pass: 'vjxn xzgv okzz dyha',
      },
    },
    twilioConfig: {
      accountSid: 'your-twilio-account-sid',
      authToken: 'your-twilio-auth-token',
      phoneNumber: 'your-twilio-phone-number',
    },
  };