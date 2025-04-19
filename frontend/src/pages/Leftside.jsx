import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../utils/axios.js'
import moment from 'moment'
import { setChatList, setSelectedUser } from '../redux/slices/chatSlice.js'

const Leftside = () => {
  const {chatList, selectedUser} = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const { data } = await axios.get('/api/chat/list');
        // console.log(data)
        dispatch(setChatList(data?.chatList))        
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };
    
    if (user) fetchChatList();
  }, [user, dispatch]);

  


  return (
    <>
                        {/* Contacts List */}
                        <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                  <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                  <h5 className="fw-bold mb-0">💬 ChatApp</h5>
                      <Link data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className="bi bi-box-arrow-right h4"></i>
                      </Link>
                    </div>
                    <div className="p-3">
                      <div className="input-group rounded mb-3 border">
                        <input
                          type="search"
                          className="form-control rounded border"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                          onChange={(e) => console.log(e.target.value)}
                        />
                        <Link to={'#'} className="input-group-text border-0">
                        <i className="bi bi-search"></i>                        </Link>
                      </div>
                      <div style={{ height: 400, overflowY: "scroll", overflowX: "hidden" }}>
      <ul className="list-unstyled mb-0">
        {chatList?.map((user) => (
          <li key={user._id} className={`p-2 border-bottom chat-item ${selectedUser._id == user._id && 'bg-body-secondary'}`}>
            <Link to="#" onClick={()=>dispatch(setSelectedUser(user))} className={`d-flex justify-content-between text-decoration-none`}>
              <div className="d-flex flex-row">
                <div>
                  <img
                    src={user?.avatar}
                    alt="avatar"
                    className="d-flex align-self-center me-3"
                    width={60}
                  />
                  <span className="badge bg-success badge-dot" />
                </div>
                <div className="pt-1">
                  <p className="fw-bold mb-0">{user.username && user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}
                  </p>
                  <p className="small text-muted">{user.message.length > 10 ? `${user.message.slice(0, 10)}...` : user.message}</p>
                </div>
              </div>
              <div className="pt-1">
                <p className="small text-muted mb-1">{moment(user.time).fromNow()}</p>
                <span className="badge bg-danger rounded-pill float-end">{user.unreadCount}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div> 

<div className="modal fade mt-25" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">💬 ChatApp</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <form onSubmit={'#'}>
      <div className="modal-body">
      <p className=" fs-4 text-muted">Are you want to Logout?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss='modal'>Close</button>
        <button type="button" className="btn btn-danger"  data-bs-dismiss="modal" onClick={()=> navigate('/logout')}>LogOut</button>
      </div>
      </form>
    </div>
  </div>
</div>
    
    </>
  )
}

export default Leftside














