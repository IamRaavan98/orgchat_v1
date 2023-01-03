const Message = require("../models/messageSchema");

const dateAndTime = require("../utils/currentDateAndTime")
const { findByIdAndRemove, findByIdAndDelete, create } = require("../models/userSchema");

exports.fetchmessages = async(req,res)=>{
   try {
    let{person1,person2} = req.body

    console.log(person1,person2);
    let fetchmessage = await Message.findOne({person1, person2})
    


//below if updatemessage is null it will find again but this time we will swap person1 and person2 values

    if(!fetchmessage){ 
         let temp = person1
         person1 = person2
         person2= temp
         fetchmessage = await Message.findOne({person1, person2}) 
    }

// so below if statement is just checking that person1 and person2 should have names so if it true means they are new pair chatting

        res.status(200).json(fetchmessage)
   } catch (error) {
     res.status(400).json({
        success:false,
         message:error.message,
     }) 
   } 
      
}

exports.addmessage = async(req,res)=>{
   try {
    let{message,person1,person2} = req.body

    console.log(person1,person2);
    let updatingMessage = await Message.findOne({person1, person2})
    
    console.log(updatingMessage);

//below if updatemessage is null it will find again but this time we will swap person1 and person2 values
    if(!updatingMessage){

         let temp = person1
         person1 = person2
         person2= temp
    
         updatingMessage = await Message.findOne({person1, person2}) 
    }
    console.log(updatingMessage);

// so below if statement is just checking that person1 and person2 should have names so if it true means they are new pair chatting
       
        if(!updatingMessage){
                updatingMessage = await Message.create({
                    person1, person2
            })
            }
            console.log(updatingMessage);
    const {date,time} = dateAndTime()
    
//we have used trim so that empty space and start and space could be avoided 
    message = message.trim()
    if(message){
        updatingMessage.chats.push({
                message,date,time
            });
            await updatingMessage.save()
    }
    
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
        const{p1,p2} = req.body
        let updatingMessage = await Message.findOneAndDelete({p1,p2})
        res.send("deleted successfully")
        
    } catch (error) {
        res.send(error.message)
    }

}