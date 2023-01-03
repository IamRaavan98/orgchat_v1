const Message = require("../models/messageSchema");

const dateAndTime = require("../utils/currentDateAndTime")
const { findByIdAndRemove, findByIdAndDelete, create } = require("../models/userSchema");

exports.addmessage = async(req,res)=>{
   try {
    const{message,person1,person2} = req.body
    console.log(person1,person2);
    let updatingMessage = await Message.findOne({person1, person2})
   
// so below if statement is just checking that person1 and person2 should have names so if it true means they are new pair chatting
    if(updatingMessage === null){
        updatingMessage = await Message.create({
        person1,person2,

      })
    }
    // console.log(updatingMessage.chats[0].createdAt);

    const {date,time} = dateAndTime()
   
    updatingMessage.chats.push({
            message,
            date,time
        });
        await updatingMessage.save()
        //  console.log(updatingMessage,);

        res.status(200).json(updatingMessage)
   } catch (error) {
     res.status(400).json({
        success:false,
         message:error.message,
     }) 
   } 
      
}

exports.DeleteMessages = async(req,res)=>{
    try {
        const {person2} = req.body
        await Message.findOneAndDelete(person2)
        res.send("deleted successfully")
        
    } catch (error) {
        res.send(error.message)
    }

}