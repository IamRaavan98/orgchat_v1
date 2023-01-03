const express = require("express");
const MessageRouter = express.Router();

const { addmessage, DeleteMessages, fetchmessages } = require("../controllers/messagesController");

//middleware
const { checkLoginOrNot } = require("../middleware/auth");


MessageRouter.post("/addmessage/:id",checkLoginOrNot,addmessage)
MessageRouter.get("/fetchmessages/:id",checkLoginOrNot,fetchmessages)


MessageRouter.delete("/DeleteMessages",checkLoginOrNot,DeleteMessages)


module.exports = MessageRouter;