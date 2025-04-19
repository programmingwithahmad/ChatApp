import userModel from "../models/userModel.js";

export const initSocket = (io) => {
  io.on('connection', async (socket) => {
    console.log('New client connected:', socket.id);
    
    // Handle user connection
    socket.on('join', async (userId) => {
      await userModel.findByIdAndUpdate(userId, { 
        online: true,
        socketId: socket.id
      });
      socket.join(userId);
      socket.broadcast.emit('userOnline', userId); // 👈 Notify others

    });

    // Handle messages
    socket.on('sendMessage', async (message) => {
      const receiver = await userModel.findById(message.receiver);
      if (receiver?.socketId) {
        io.to(receiver.socketId).emit('newMessage', message);
      }
    });


    // Handle disconnect
    socket.on('disconnect', async () => {
      const user = await userModel.findOneAndUpdate({ socketId: socket.id }, { 
        online: false,
        lastSeen: new Date()
      },{ new: true }); 
       
      if(user){
        io.emit('userOffline', { 
          userId: user._id, 
          lastSeen: user.lastSeen 
        })
      }

      console.log('Client disconnected:', socket.id);
    });
  });
}; 