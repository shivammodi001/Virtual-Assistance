const express = require("express");
const { signup, signin, logOut } = require("../controllers/auth.controllers");
const authRouter = express.Router();

authRouter.post("/signup",signup);
authRouter.post("/signin",signin);
authRouter.get("/logout",logOut);

module.exports = authRouter;