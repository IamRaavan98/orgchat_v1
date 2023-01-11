const Message = require("../models/messageSchema");

const dateAndTime = require("../utils/currentDateAndTime");
const {
  findByIdAndRemove,
  findByIdAndDelete,
  create,
} = require("../models/userSchema");

exports.fetchmessages = async (req, res) => {
  try {
   
    let idFrom = req.user._id;
    let idTo = req.params.id;
   
    let updatingMessage = await Message.findOne({'person1.from': idTo, 'person2.to' : idFrom,});
      // console.log(updatingMessage,"1");

    //below if updatemessage is null it will find again but this time we will swap person1 and person2 ids
    if (!updatingMessage) {
      // updatingMessage = await Message.findOne({'person1.from': idFrom, 'person2.to' : idTo,});
       updatingMessage = await Message.findOne({'person1.from': idFrom, 'person2.to' : idTo,});


      // console.log(updatingMessage,"2");
    }
    res.status(200).json(updatingMessage);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    console.log(error.message);
  }
};
exports.addmessage = async (req, res) => {
  try {
    let { message} = req.body;
   

    let idFrom = req.user._id;
    let idTo = req.params.id;
    let updatingMessage = await Message.findOne({'person1.from': idFrom, 'person2.to' : idTo,});
 

    //below if updatemessage is null it will find again but this time we will swap person1 and person2 values
    if (!updatingMessage) {
      updatingMessage = await Message.findOne({'person1.from': idTo, 'person2.to' : idFrom,});
    }

    // so below if statement is just checking that person1 and person2 should have names so if it true means they are new pair chatting
  //  console.log(idFrom,idTo);
    if (!updatingMessage) {
      updatingMessage = await Message.create({
        person1:{
          from :idFrom,
        },
        person2:{
          to :idTo,
        }
      });
    }

    const { date, time } = dateAndTime();

    //we have used trim so that empty space and start and space could be avoided
    message = message.trim();
    if (message) {
      updatingMessage.chats.push({
        message,
        user:idFrom,
        date,
        time,
      });
      await updatingMessage.save();
    }

    res.status(200).json(updatingMessage);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    console.log(error.message);
  }
};

exports.DeleteMessages = async (req, res) => {
  try {
    const { from, to } = req.body;
    let updatingMessage = await Message.findOneAndDelete({ from, to });
    res.send("deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
};
