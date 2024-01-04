// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const jwtConfig = require('../config/jwtConfig');
const mailController=require("./mailController")

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const userId = new mongoose.Types.ObjectId();
    // Create a new user
    const newUser = new User({
      userId,
      username,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT for the user
    const token = jwt.sign({ userId }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    const verificationLink = `http://localhost:5173/dashboard`;

    // Send the verification email
    await mailController.sendVerificationEmail(email, verificationLink);

    // Respond with the token
    res.status(200).json({ token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist or the password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT for the user
    const token = jwt.sign({ userId: user._id }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    // Respond with the token
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;

    // Verify the token
    const decodedToken = jwt.verify(verificationToken, jwtConfig.secretKey);

    // Find the user by the decoded token
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's status to indicate they are verified
    user.isVerified = true;
    user.verificationToken = undefined; // Remove the verification token
    await user.save();

    // Redirect to the dashboard or send a success message
    res.redirect('http://localhost:5173/dashboard/dashboard');
  } catch (error) {
    console.error('Verification error:', error);
    res.status(400).json({ error: 'Invalid or expired verification token' });
  }
};

