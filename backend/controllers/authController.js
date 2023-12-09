const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('../config');

exports.register = async (req, res) => {
    try {
       const { username,email,password} = req.body;

       const existingUser = await User.findOne({email});

       if(existingUser){
           return res.status(400).json({ message: "User already exists"});
       }

       //console.log("request body",req.body)
       
       const saltRounds =10;
       const hashedPassword = await bcrypt.hash(password,saltRounds);


       const newUser = new User({
        username,
        email,
        password:hashedPassword,
        isVerified: false,
       });
       

       await newUser.save();
     
       
    //    const emailVerificationToken = jwt.sign(
    //     {userId :newUser._id},
    //     config.secretKey,
    //     {expiresIn: "10d"}

    //    );

    //    const verificationLink = `http://localhost:5000/api/auth/verify-email/${emailVerificationToken}`;

    //    const transporter = nodemailer.createTransport(config.emailConfig);

    //    await transporter.sendMail({
    //         from: "yasirkatib12@gmail.com",
    //         to: newUser.email,
    //         subject: "verify your mail",
    //         html: `Click <a href="${verificationLink}">here</a> to verify your mail`

        

       //});
         res.status(200).json({message:"registration done"})
        
    } catch(error){
        console.error("registration error:",error);
        res.status(500).json({error:"Internal Server Error"});
    }




    }

    exports.login = async (req, res) => {
        try {
          const { email, password } = req.body;
      
          const user = await User.findOne({ email });
          console.log('User:', user);
      
          if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
          }
      
        //   console.log('Is Verified:', user ? user.isVerified : 'User not found') // Add this line for debugging
      
        //   if (!user.isVerified) {
        //     return res.status(401).json({ error: 'Email not verified' });
        //   }
      
          //console.log('Stored Password:', user.password);
      
          const passwordMatch = await bcrypt.compare(password, user.password);
      
          //console.log('Password Match:', passwordMatch);
      
          if (passwordMatch) {
            res.status(200).json({message:"login done"})
            // const token = jwt.sign({ userId: user._id }, config.secretKey, { expiresIn: '5h' });
            // res.json({ token, user: { id: user._id, email: user.email } });
          } else {
            res.status(401).json({ error: 'Invalid email or password' });
          }
        } catch (error) {
          console.error('Login error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      
      


    // exports.verifyEmail = async (req, res) => {
    //     try {
    //       const token = req.params.token;
      
    //       // Verify the token
    //       const decodedToken = jwt.verify(token, config.secretKey);
      
    //       console.log('Decoded Token:', decodedToken);  // Log the decoded token
      
    //       // Find the user by ID
    //       const user = await User.findById(decodedToken.userId);
    //       console.log('User:', user);
      
    //       if (!user) {
    //         return res.status(404).json({ error: 'User not found for verification' });
    //       }
      
    //       // Check if the user is already verified
    //       if (user.isVerified) {
    //         return res.status(400).json({ error: 'Email already verified' });
    //       }
      
    //       // Update user as verified
    //       user.isVerified = true;
    //       await user.save();
      
    //       res.json({ message: 'Email verification successful' });
    //     } catch (error) {
    //       console.error('Email verification error:', error);
    //       res.status(500).json({ error: 'Internal Server Error' });
    //     }
    //   };
      