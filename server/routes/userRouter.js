const express = require("express")
const userRouter = express.Router();
const {login,
       logout,
       signup,
       allLoggingUsersList,
       Home} = require("../controllers/userController");


//middleware
const { checkLoginOrNot } = require("../middleware/auth");
       userRouter.get("/",Home)
       userRouter.post("/login",login)
       userRouter.post("/signup",signup)
       userRouter.get("/allLoggingUsersList",checkLoginOrNot,allLoggingUsersList)
       userRouter.get("/logout",logout)

module.exports = userRouter;