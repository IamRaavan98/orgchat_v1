require("dotenv").config();
const express = require('express')
const app = express()
const cors = require("cors");
const cookieParser = require('cookie-parser')
const routes = require("./routes/routes")
//connection to database
const DBconnection = require("./config/DB")


//middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
DBconnection();
app.use("/",routes)

module.exports = app;