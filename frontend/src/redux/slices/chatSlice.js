import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
     chatList: [],
     selectedUser: [],
     messages: [],
     newMessage: ''
  },
  reducers: {
    setChatList: (state, action) => {
      state.chatList = action.payload;
    },
    setSelectedUser: (state, action) => {
      const selected = action.payload;

      state.selectedUser = selected

        // Reset unread count
  state.chatList = state.chatList.map(user =>
    user._id === selected._id ? { ...user, unreadCount: 0 } : user
  );
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload
    },
    setUserOnline: (state, action) => {
      const userId = action.payload;
    
      // Update chatList
      state.chatList = state.chatList.map(user =>
        user._id === userId ? { ...user, online: true } : user
      );
    
      // Update selectedUser if it matches
      if (state.selectedUser && state.selectedUser._id === userId) {
        state.selectedUser = { ...state.selectedUser, online: true };
      }
    },
    setUserOffline: (state, action) => {
      const data = action.payload;
    
      // Update chatList
      state.chatList = state.chatList.map(user =>
        user._id === data?.userId ? { ...user, online: false, lastSeen: data?.lastSeen } : user
      );
    
      // Update selectedUser if it matches
      if (state.selectedUser && state.selectedUser._id === data?.userId) {
        state.selectedUser = { ...state.selectedUser, online: false, lastSeen: data?.lastSeen };
      }
    },
    updateLastMessage: (state, action) => {
      const  message  = action.payload;
      const senderId = message.sender._id;
      const receiverId = message.receiver._id;
      const lastMsg = message.content || '';
      const time = message.createdAt || new Date().toISOString();
    
      state.chatList = state.chatList.map(user => {
        if (user._id === senderId || user._id === receiverId) {
          return {
            ...user,
            message: lastMsg,
            time: time,
          };
        }
        return user;
      });
    },
    incrementUnreadCount: (state, action) => {
      const  senderId  = action.payload;
    
      state.chatList = state.chatList.map(user =>
        user._id == senderId
          ? { ...user, unreadCount: (user.unreadCount || 0) + 1 }
          : user
      );
    }
    
    
    
    
    
    

  },
});

export const { setChatList, setSelectedUser, setMessages, setNewMessage, setUserOnline, setUserOffline, updateLastMessage, incrementUnreadCount } = chatSlice.actions;
export default chatSlice.reducer;



