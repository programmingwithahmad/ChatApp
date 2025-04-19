import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";

export const getChatList = async (req, res) => {
    try {
      const currentUser = req.user._id;
      const users = await userModel.find({ _id: { $ne: currentUser } });
      
      const chatList = await Promise.all(users.map(async (user) => {
        const lastMessage = await messageModel.findOne({
          $or: [ 
            { sender: currentUser, receiver: user._id },
            { sender: user._id, receiver: currentUser }
          ]
        }).sort({ createdAt: -1 }).populate('sender receiver');
  
        const unreadCount = await messageModel.countDocuments({
          receiver: currentUser,
          sender: user._id,
          read: false
        });
  
        return { 
          _id: user._id,
          username: user.username,
          avatar: user.avatar,
          message: lastMessage?.content || 'No messages yet',
          time: lastMessage?.createdAt || user.createdAt,
          unreadCount,
          online: user.online,
          lastSeen:user.lastSeen
        };
      }));
  
      res.status(200).json({success: true, message: 'chatList Received', chatList});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  export const getMessages = async (req, res) => {
    try {
      const messages = await messageModel.find({
        $or: [
          { sender: req.user._id, receiver: req.params.userId },
          { sender: req.params.userId, receiver: req.user._id }
        ]
      }).sort({ createdAt: 1 }).populate('sender', '-password').populate('receiver', '-password');

      await messageModel.updateMany(
        { sender:req.params.userId , receiver:req.user._id , read: false },
        { $set: { read: true } }
      );
  
      res.status(200).json({success: true, message: 'Messages Received', messages});
    } catch (error) {
      res.status(500).json({ message: 'Error in getMessages' });
    }
  };


  export const sendMessage = async (req, res) => {
    try {
      const { content, receiver } = req.body;
      console.log(content, receiver)
      const newMessage = new messageModel({
        sender: req.user._id,
        receiver,
        content
      });
  
      const savedMessage = await newMessage.save();
      const populatedMessage = await savedMessage.populate('sender receiver');
      
      res.status(201).json(populatedMessage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };