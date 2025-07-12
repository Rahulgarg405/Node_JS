require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    // extract information :

    const { username, email, password, role } = req.body;
    // check whether it already exists or not :
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with same username or email.",
      });
    }

    // hash user password :

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user and save in database :

    const newCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newCreatedUser.save();

    if (newCreatedUser) {
      res.status(201).json({
        success: true,
        message: "User registered Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not registered!!!",
      });
    }
  } catch (error) {
    console.log("Some error occurred");
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user exists in db or not :
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't Exists",
      });
    }

    // check if password is correct or not :
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // create access token :
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log("Some error occurred");
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = { registerUser, loginUser };
