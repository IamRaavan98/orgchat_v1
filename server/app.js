require("dotenv").config();
const express = require('express')
const app = express()
const cors = require("cors");
var cookieParser = require("cookie-parser");
const user = require("./routes/userRouter")
const message = require("./routes/messageRoute")
//connection to database
const DBconnection = require("./config/DB")


    //middleware
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
    origin: 'https://orgchat-v1.vercel.app/',
    credentials: true,
}));
    DBconnection();
    app.use("/",user)
    app.use("/message",message)
    module.exports = app;