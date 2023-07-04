const User = require("../models/user.module");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
//
//
// Creating Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};
//
//
// User LogIn
const viewUser = async (req, res) => {
  const viewUsers = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(viewUsers);
};
//
//
// User LogIn
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw Error("All fileds must be filed");
    // is User exist ?
    const existUser = await User.findOne({ email });
    if (!existUser) throw Error("Email is incorrect");
    // Hashing password
    const match = await bcrypt.compare(password, existUser.password);
    if (!match) throw Error("Password is incorrect");

    // create a token
    const token = createToken(existUser._id);
    res.status(200).json({ email, username: existUser.username, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//
//
// User SingUp
const singup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      throw Error("All fileds must be filed");
    if (!validator.isEmail(email)) throw Error("Email is not vaild");
    if (!validator.isStrongPassword(password))
      throw Error("Password is not strong engouh");
    // is User exist ?
    const exist = await User.findOne({ email });
    if (exist) throw Error("Email is in use");
    // Hashing password
    const hashPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({ username, email, password: hashPassword });

    // create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//
//
// Export module
module.exports = {
  viewUser,
  login,
  singup,
};
