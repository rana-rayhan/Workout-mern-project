const User = require("../models/user.module");
const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  //verifying authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    // distructure id from token
    const { id } = jwt.verify(token, process.env.SECRET);
    // matching id from database
    req.authUser = await User.findOne({ _id: id }).select("_id");
    next();
    //catch error
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
