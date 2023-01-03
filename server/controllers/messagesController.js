const Message = require("../models/messageSchema");

const dateAndTime = require("../utils/currentDateAndTime");
const {
  findByIdAndRemove,
  findByIdAndDelete,
  create,
} = require("../models/userSchema");

exports.fetchmessages = async (req, res) => {
  try {
    let idTo = req.params.id;
    let idFrom = req.user._id;

    let updatingMessage = await Message.findOne({idTo, idFrom});

    //below if updatemessage is null it will find again but this time we will swap person1 and person2 ids
    if (!updatingMessage) {
      let temp = idTo;
      idTo = idFrom;
      idFrom = temp;
      updatingMessage = await Message.findOne({ idTo, idFrom });

      temp = idTo;
      idTo = idFrom;
      idFrom = temp;
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
    let { message, p1, p2 } = req.body;
    let idTo = req.params.id;
    let idFrom = req.user._id;

    let updatingMessage = await Message.findOne({ idTo, idFrom });

    //below if updatemessage is null it will find again but this time we will swap person1 and person2 values
    if (!updatingMessage) {
      let temp = idTo;
      idTo = idFrom;
      idFrom = temp;
      updatingMessage = await Message.findOne({ idTo, idFrom });

      temp = idTo;
      idTo = idFrom;
      idFrom = temp;
    }

    // so below if statement is just checking that person1 and person2 should have names so if it true means they are new pair chatting

    if (!updatingMessage) {
      updatingMessage = await Message.create({
        person1: {
          p1: p1,
          user: idFrom,
        },
        person2: {
          p2,
          user: idTo,
        },
      });
    }

    const { date, time } = dateAndTime();

    //we have used trim so that empty space and start and space could be avoided
    message = message.trim();
    if (message) {
      updatingMessage.chats.push({
        message,
        user: idFrom,
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
    const { p1, p2 } = req.body;
    let updatingMessage = await Message.findOneAndDelete({ p1, p2 });
    res.send("deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
};
