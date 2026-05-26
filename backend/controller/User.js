const User = require("../models/User");
const bcrypt= require("bcryptjs")
var jwt = require('jsonwebtoken');
const saltRound=10 ;

const logInUser=async (req, res) => {
  let { phonenumber, password } = req.body;
  if (!process.env.SECRET_KEY) {
    console.error("SECRET_KEY not found in environment");
    return res.status(500).json({ msg: "Server configuration error" });
  }
  try {
    const users = await User.findOne({ phonenumber:'+977 '+phonenumber });
    if (users) {
      const isMatched= await bcrypt.compare(password, users.password)
      if (isMatched) {
        var token = jwt.sign({ phonenumber: users.phonenumber }, process.env.SECRET_KEY);
        return res.status(200).json({
          msg: "Login successfully!",
          users,
          token,
        });
      } else {
        return res.status(401).json({ msg: "Wrong password" });
      }
    } else {
      return res.status(409).json({ msg: "Please create your account first" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ msg: "Failed to login" });
  }
}

const registerUser=async (req, res) => {
  let { phonenumber, password, username,email ,role } = req.body;
  console.log(req.body)
  phonenumber='+977 '+phonenumber
  try { 
    const phoneExist = await User.exists({phonenumber:phonenumber})
    const emailExist = await User.exists({ email:email})
    if (phoneExist || emailExist) {
      return res.status(409).json({ msg: "User already exist" });
    } else {
      const hashPassword= await bcrypt.hash(password,saltRound)
      password=hashPassword
      const result = await User.create({ phonenumber, password, username, email ,role });
      res.status(200).json({ msg: "User signup successful" });
    }
  } catch (err) {    console.error("Signup error:", err);    res.status(500).json({ msg: "Failed to signup"});
  }
}

const getAllUser= async (req, res) => {
  try{  const users=await User.find()
        res.status(200).json({msg:'Users list',users})
  }catch(err){
    console.error("Fetch users error:", err);
    res.status(500).json({ msg: "Failed to fetch users list" });
  }
 
}
module.exports ={logInUser,registerUser,getAllUser}