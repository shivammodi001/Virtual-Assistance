const express = require("express");
const {getCurrentUser , updateAssistant ,askToAssistant} = require("../controllers/user.controllers");
const { isAuth } = require("../middleware/isAuth");
const userRouter = express.Router();
const upload = require("../middleware/multer");

userRouter.get("/current", isAuth ,getCurrentUser);
userRouter.post("/update", isAuth , upload.single("assistantImage"), updateAssistant);
userRouter.post("/asktoassistant", isAuth , askToAssistant);

module.exports = userRouter;