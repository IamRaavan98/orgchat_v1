// const jwt = require("jsonwebtoken")
// const User = require("../models/userSchema")

// exports.getallusers = async(req,res)=>{
//     try {
//   const token =
//   req.cookies.token ||
//   req.body.token
         
//         if(!token){
//             return res.status(403).send("token is missing");
//         }
//         else{
//             const decode = jwt.verify(token, process.env.SECRET_KEY);
//             console.log(decode);
//             req.user = decode; 

//             const email = decode.email
//             const data =await User.find()
//             res.status(200).json(data)
//         }
//     } catch (error) {
//         return res.status(401).send("Invalid Token");
//     }

// }

const jwt = require("jsonwebtoken");
//model is optional
exports.getallusers = (req, res, next) => {
    const token =
    req.cookies.token ||
    req.body.token 
    // req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    if (!token) {
      console.log("i am workings");
    return res.status(403).send("token is missing");
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decode);
    req.user = decode;
    // bring in info from DB
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


