const mongoose = require("mongoose");
const User = require("./userSchema");
const messageSchema = new mongoose.Schema(
  
  {
    person1: {
      from: String,
    },
    person2: {
      to: String,
    },
    chats: [
      {
        message: {
          type: String,
          default: null,
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        date: String,
        time: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Message", messageSchema);
