const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const token = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config()

const userSchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required: [true, "Name is required"],
    },
    email:{
        type:String,
        required: [true, "email is required"],
    },
    password:{
        type:String,
        required: [true, "password is required"],
    },
  },
  
  {
    timestamps:true,
  },

)
// userSchema.pre('save',async function(next){
//     if(this.isModified("password")){
//     return this.password= await bcrypt.hash(this.password,10);
//     }
//     next();
// })
// userSchema.methods = {
//     comparePassword :async function(receivedPassword){
//         const match = await bcrypt.compare(this.password,receivedPassword)
//     },
//     generateToken: async function(){
//       return jwt.sign(
//         {
//            _id:this._id,
//            email:this.email
//         },
//         process.env.SECRET_KEY,
//         {
//             expiresIn: "2day",
//         },
//         )
        
//     },
//     forgotPassword: async function(){
        
//     }
// }


module.exports = mongoose.model("User",userSchema);
