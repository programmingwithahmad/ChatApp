import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from '../utils/axios.js'
import { incrementUnreadCount, setMessages, setNewMessage, updateLastMessage } from '../redux/slices/chatSlice.js'
import { socket } from '../socket.js'
import { useRef } from 'react'
const audio = new Audio('/notification.mp3');



const Rightside = () => {
  const {selectedUser, messages, newMessage } = useSelector((state) => state.chat)
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const messagesEndRef = useRef(null);



  useEffect(() => {

    socket.on('newMessage', (message) => {
      const isCurrentChat =
        message.sender._id === selectedUser?._id ||
        message.receiver._id === selectedUser?._id;
  
      if (isCurrentChat) {
        dispatch(setMessages([...messages, message]));
      } else {
        audio.play().catch((err) => console.log("Sound error:", err));

        // Increment unreadCount for sender if not viewing chat
        dispatch(incrementUnreadCount(message?.sender?._id ));
      }
  
      dispatch(updateLastMessage( message ));
    });
  
    return () => {
      socket.off('newMessage');
    };
  }, [dispatch, messages, selectedUser?._id]);
  


  useEffect(() => {
    const fetchMessages = async () => {
       
        try {
          const res = await axios.get(`/api/chat/messages/${selectedUser._id}`);
          // console.log(res.data)
          // console.log(selectedUser)
          dispatch(setMessages(res.data.messages))
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }

      if (selectedUser ) fetchMessages();
  }, [selectedUser, dispatch]);

  const handleSend = async() => {
      try {
        // console.log(newMessage)
      const res = await axios.post('/api/chat/send', {
        content: newMessage,
        receiver: selectedUser._id
      });
      //  console.log(res)
       dispatch(setMessages([...messages, res.data]));
       dispatch(updateLastMessage(res?.data))

       socket.emit('sendMessage', res.data);
      dispatch(setNewMessage(''));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  

  return (
    <>
    {selectedUser.length === 0 ? (
      <div className="col-md-6 col-lg-7 col-xl-8 d-flex justify-content-center align-items-center text-center bg-light">
        <div>
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="rounded-circle shadow"
            style={{ width: 100, height: 100 }}
          />
          <h4 className="mt-3 text-primary">Hi {user?.username && user?.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()},</h4>
          <p className="mt-2 fs-4 text-muted fst-italic">Start Conversation</p>
        </div>
      </div>
    ) : (<>
                        {/* Chat Section */}
                         <div className="col-md-6 col-lg-7 col-xl-8 d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                      <div className="d-flex align-items-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                          alt="avatar"
                          className="rounded-circle"
                          width={35}
                          height={'100%'}
                        />
                        <div className="ms-2">
                          <p className="mb-0 fw-bold">{selectedUser?.username 
  ? selectedUser.username.charAt(0).toUpperCase() + selectedUser.username.slice(1).toLowerCase()
  : 'John'}</p>
                          <small className="text-success">{selectedUser?.online==true ? 'Online' : (selectedUser?.lastSeen ? (<>
                            {new Date(selectedUser?.lastSeen).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            | {new Date(selectedUser?.lastSeen).toLocaleDateString()}
                          
                          </>) : 'Available')}</small>
                        </div>
                      </div>
                    </div>
                    <div
  className="pt-3 pe-3"
  style={{ height: 400, overflowY: "scroll", overflowX: "hidden" }}
>
  {messages?.map((msg, ) => {
    const isSender = msg.sender.email === user.email; // change this condition based on current user
    return (
      <div
        key={msg._id}
        className={`d-flex flex-row ${isSender ? "justify-content-end" : "justify-content-start"}`}
      >
        {!isSender && (
          <img
            src={msg.sender.avatar}
            alt="avatar"
            style={{ width: 45, height: "100%" }}
          />
        )}
        <div>
          <p
            className={`small p-2 ${isSender ? "me-3" : "ms-3"} mb-1 rounded-3 ${
              isSender ? "text-white bg-primary" : "bg-body-tertiary"
            }`}
          >
            {msg.content}
          </p>
          <p className="small text-muted float-end">
            {new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            | {new Date(msg.createdAt).toLocaleDateString()}
          </p>
        </div>
        {isSender && (
          <img
            src={msg.sender.avatar}
            alt="avatar"
            style={{ width: 45, height: "100%" }}
          />
        )}
      </div>
    );
  })}
  <div ref={messagesEndRef} />
</div>

                    {/* Input Field */}
                    <div className="text-muted d-flex align-items-center p-3 bg-body-secondary">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                        alt="avatar"
                        style={{ width: 40, height: "100%" }}
                      />
                      <input
                        type="text"
                        className="form-control form-control-md mx-2"
                        placeholder="Type message"
                        onChange={(e) => dispatch(setNewMessage(e.target.value))}
                        onKeyDown={(e) => e.key == 'Enter' && handleSend()}
                        value={newMessage}
                      />
                      <Link to="#" onClick={handleSend} className="ms-2"><i className="bi bi-send h4"></i></Link>
                    </div>
                  </div>
                  </>
    )}
    </>
  )
}

export default Rightside







