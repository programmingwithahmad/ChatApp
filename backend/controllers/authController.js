import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signupController = async (req, res) => {
  const { username, email, password } = req.body;
  if(!username){
    return res.status(404).send({message:'Username is required'})
}
if(!email){
    return res.status(404).send({message:'Email is required'})
}
if(!password){
    return res.status(404).send({message:'Password is required'})
}
//check
const existingUser = await userModel.findOne({email})
//existingUser
if(existingUser){
    return res.status(200).send({success:false, message:'Already register, Please login'})
}
  const hashed = await bcrypt.hash(password, 10);
  const newUser = new userModel({ username, email, password: hashed });
  await newUser.save();
  res.status(201).json({message:"Signup successful!"});
};


export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json("User not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json("Invalid credentials");
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.RUN === 'production',
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  }).json({success: true,  message: "Login successful", user: {
    _id:user._id,
    username:user.username,
    email:user.email,
    avatar:user.avatar,
    online:user.online,
    createdAt:user.createdAt,
    updatedAt:user.updatedAt
  } });
};


export const verifyTokenController = async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({success: false, message:'Not authenticated'});
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded._id).select("-password"); // remove password from response
  
      if (!user) return res.status(404).json({success: false, message:"User not found"});
  
      res.status(200).json({success: true, user: {
        _id:user._id,
        username:user.username,
        email:user.email,
        avatar:user.avatar,
        online:user.online,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt
      }}); // ✅ return full user data (username, email etc.)
    } catch (err) {
      return res.status(401).json({success: false, message:'Invalid token'});
    }
  };
  
  
  export const logoutController = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.RUN === 'production', // Set to true in production with HTTPS
      });
  
      return res.status(200).json({ success: true, message: "Logout successful" });
    } catch (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ success: false, message: "Server error during logout" });
    }
  };
  