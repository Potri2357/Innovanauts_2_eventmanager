const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, department, yearofpassing, clubs, password, role } =
    req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    department,
    yearofpassing,
    clubs,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      yearofPassing: user.yearofpassing,
      clubs: user.clubs,
      password: user.password,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred!");
  }

  res.json({
    username,
    email,
  });
});

const authUser = async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email, role });

  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.username,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    res.send({ message: "Invalid email/password " });
  }
};

module.exports = { registerUser, authUser };
