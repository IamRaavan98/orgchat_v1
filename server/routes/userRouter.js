const express = require("express")
const userRouter = express.Router();
const {login,
       logout,
       signup,
       getallusers} = require("../controllers/userController");


//middleware
const { checkLoginOrNot } = require("../middleware/auth");
      
       userRouter.post("/login",login)
       userRouter.post("/signup",signup)
       userRouter.get("/getallusers",checkLoginOrNot,getallusers)
       userRouter.get("/logout",logout)

module.exports = userRouter;