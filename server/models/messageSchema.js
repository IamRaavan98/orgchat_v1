const mongoose = require("mongoose")
const User = require("./userSchema")
const messageSchema = new mongoose.Schema({
    person1:{
        type:String,
        default:null,
    },
    person2:{
        type:String,
        default:null
    },
    chats:[
        {
            message:{
                type:String,
                 default:null
            },
            date:String,
            time:String,
            
        },
        ],
},
{
    timestamps:true
})
module.exports = mongoose.model("Message",messageSchema);

