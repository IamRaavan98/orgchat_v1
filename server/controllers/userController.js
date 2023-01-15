const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
  
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    } else {
      await bcrypt.compare(password, user.password);

      const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      // res.status(200).json(user);

      // if you want to use cookies
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({

        success: true,
        token,
        user,
      });
    }

    // res.status(400).send("email or password is incorrect");
  } catch (error) {
    res.send(error.message);
    // console.log(error);
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "You are logout",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if(!name&&!email&&!password){
      throw new Error("somes fields are missing")
    }
    // console.log(name, email, password);
    // we are not covering if fields are empty we cover it in frontend itself
    // we are considering that as user is not signup yet he is not having any todo or task
    const UserExists = await User.findOne({ email });

    if (UserExists) {
      throw new Error("Email already exists");
    } else {
      const myEncPassword = await bcrypt.hash(password, 10);
      //  console.log(myEncPassword,password);

      const user = await User.create({
        email: email,
        password: myEncPassword,
        name: name,
      });

      // as soon as we create a user in mongo it return us an _id

      //we are creating todoschema for this email so that data could be stored

      //  token
      const token = jwt.sign(
        {
          user_id: user._id,
          email,
          myEncPassword,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "2day",
        }
      );

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });
    }
  } catch (error) {
    res.send(error.message);
  }
};

exports.allLoggingUsersList =async (req, res)=> {
  try {
    const token = req.cookies.token || req.body.token;
    if (!token) {
      throw new Error("token is missing")
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decode;

    const email = decode.email;

    const data = await User.find();
    if (!data) {
      throw new Error("data not found in getAllUSers");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message
    });
  }
};

exports.Home = async(req,res)=>{
  res.status(400).send("Welcome from backend")
}