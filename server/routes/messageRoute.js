const express = require("express");
const MessageRouter = express.Router();

const { addmessage, DeleteMessages } = require("../controllers/messagesController");

//middleware
const { checkLoginOrNot } = require("../middleware/auth");


MessageRouter.post("/addmessage",checkLoginOrNot,addmessage)

MessageRouter.delete("/DeleteMessages",checkLoginOrNot,DeleteMessages)


module.exports = MessageRouter;