const mongoose = require("mongoose");
const User = require("./userSchema");
const messageSchema = new mongoose.Schema(
  {
    person1: {
      p1: String,
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    },
    person2: {
      p2: String,
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
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
