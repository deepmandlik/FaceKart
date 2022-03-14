const { User } = require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const dotenv = require('dotenv');


exports.userRegister = async (userDets, res) => {
    //console.log(userDets);
    const {email} =  userDets;
    const user = await User.findOne({ email });
    // console.log(userCreds);
    if (user) {
      return res.status(404).json({
        message: "Email already Used. Please try another.",
        success: false
      });
    }
    
    try {
      const password = await bcrypt.hash(userDets.password, 12);
      const newUser = new User({
        ...userDets,
        password,
      });

      //console.log(newUser)
      await newUser.save();
      let token = jwt.sign(
        {
          user_id: newUser._id,
          name: newUser.name,
          email: newUser.email
        },
        process.env.SECRET,
        { expiresIn: "365 days" }
      );
  
      return res.status(201).json({
        name : userDets.name,
        token : token, 
        message: "Hurry! now you are successfully registred",
        success: true
      });
    } catch (err) {
      return res.status(500).json({
        message: `Unable to create your account ${err.message}`,
        success: false
      });
    }
  };

exports.userLogin = async (userCreds, res) => {
    let { email, password } = userCreds;
    const user = await User.findOne({ email });
    // console.log(userCreds);
    if (!user) {
      return res.status(404).json({
        message: "Email is not found. Invalid login credentials.",
        success: false
      });
    }
    
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Sign in the token and issue it to the user
      let token = jwt.sign(
        {
          user_id: user._id,
          name: user.name,
          email: user.email
        },
        process.env.SECRET,
        { expiresIn: "365 days" }
      );

      let result = {
        id : user._id,
        name: user.name,
        email: user.email,
        token: `Bearer ${token}`,
        expiresIn: 365,
      };
  
      return res.status(200).json({
        ...result,
        message: "Hurray! You are now logged in.",
        success: true
      });
    } else {
      return res.status(403).json({
        message: "Incorrect password.",
        success: false
      });
    }
  };

exports.userAuth = passport.authenticate("jwt", { session: false });


exports.serializeUser = user => {
    return {
      name: user.name,
      _id: user._id,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
      success: true
    };
  };

