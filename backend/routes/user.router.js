const { login, singup, viewUser } = require("../controllers/user.controller");

const router = require("express").Router();
//
//
// View users
router.get("/", viewUser);
//
//
//login routes
router.post("/login", login);
//
//
//singup route
router.post("/singup", singup);
//
//
//export routes
module.exports = router;
