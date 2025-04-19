import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
  },
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  avatar: {
    type: String,
    default: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
  },
  online: {
    type: Boolean,
    default: false
  },
  socketId: String,
  lastSeen: Date
}, { timestamps: true });

export default mongoose.model("User", userSchema);


