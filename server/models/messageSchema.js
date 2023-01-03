const mongoose = require("mongoose")
const User = require("./userSchema")
const messageSchema = new mongoose.Schema({
    person1:{
        type:String,
        default:undefined,
    },
    person2:{
        type:String,
        default:undefined,
    },
   
    chats:[
        {
            message:String,
            date:String,
            time:String,
        },
        ],
},
{
    timestamps:true
})
module.exports = mongoose.model("Message",messageSchema);

