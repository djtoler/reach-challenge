const asyncHandler = require("express-async-handler");
const User = require("../models/user-model");
const generateToken = require("../configs/token-generator");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, picture } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
      picture,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });

const authUser = asyncHandler(async (req, res) => {
    console.log("in  log route");
    const {email, password} = req.body;

    const user = await User.findOne( {email} );
    console.log(user);

    if (user && (await user.matchPassword)) {
        console.log("in pw match");
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id)
        });
    }
    else {
      console.log("failed");
    }
})

module.exports = { registerUser, authUser };