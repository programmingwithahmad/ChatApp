import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setLoading, setUser } from "./redux/slices/authSlice.js";
import axios from './utils/axios.js'
import { store } from "./redux/store.js";
import { socket } from "./socket.js";
import { setUserOffline, setUserOnline } from "./redux/slices/chatSlice.js";
import Loading from "./components/Loading.jsx";
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Chatlayout = lazy(() => import("./pages/Chatlayout.jsx"));
const Logout = lazy(() => import("./utils/Logout.js"));

const App = () => {

  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {

    const fetchUser = async () => {
      dispatch(setLoading(false));

      const userInRedux = store.getState().auth.user;
      if (!userInRedux) return; // ⛔ don't call if user already logged out

      try {
        const res = await axios.get("/api/auth/verifytoken");
        if(res.success){
          dispatch(setUser(res.data.user));
        }
      } catch (err) {
      dispatch(logout())
      socket.disconnect()
      console.log(err)
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      socket.connect()
      socket.emit('join', user?._id);
    }

    socket.on('userOnline', (userId) => {
      if (userId) {
        dispatch(setUserOnline(userId));
      }
    });

    socket.on('userOffline', (data) => {
      if (data) {
        dispatch(setUserOffline(data));
      }
    });
  
    return () => {
      socket.off('userOnline')
      socket.off('userOffline')
    }

  }, [user?._id, dispatch]);


  return (
    <Routes>
      <Route path="/login" element={
            <Suspense fallback={<Loading/>}>
        <Login/>
        </Suspense>
} />
      <Route path="/signup" element={
                    <Suspense fallback={<Loading/>}>

        <Signup />
        </Suspense>

        } />
      <Route
        path="/"
        element={
          <ProtectedRoute>
                        <Suspense fallback={<Loading/>}>

            <Chatlayout/>
            </Suspense>

            </ProtectedRoute>

        }
      />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default App;








// import './index.css'
// import {Link} from 'react-router-dom'




// const App = () => {

  

//   return (
//     <>
//     {/* <h3>{first}</h3> */}
//     <section style={{ backgroundColor: "#CDC4F9", overflow: "auto" }}>
//       <div className="container d-flex align-items-md-center justify-content-center py-md-0 py-4" style={{height: "100vh"}}>
//         <div className="row w-100">
//           <div className="col-md-12">
//             <div className="card" id="chat3" style={{ borderRadius: 12 }}>
//               <div className="card-body">
//                 <div className="row">
//                   {/* Contacts List */}
//                   <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
//                   <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
//                   <h5 className="fw-bold mb-0">ChatApp</h5>
//                       <Link to="/logout">
//                         <i className="bi bi-box-arrow-right h4"></i>
//                       </Link>
//                     </div>
//                     <div className="p-3">
//                       <div className="input-group rounded mb-3 border">
//                         <input
//                           type="search"
//                           className="form-control rounded border"
//                           placeholder="Search"
//                           aria-label="Search"
//                           aria-describedby="basic-addon2"
//                           onChange={(e) => console.log(e.target.value)}
//                         />
//                         <Link to={'#'} className="input-group-text border-0">
//                         <i class="bi bi-search"></i>                        </Link>
//                       </div>
//                       <div style={{ height: 400, overflowY: "scroll", overflowX: "hidden" }}>
//                         <ul className="list-unstyled mb-0">
//                           {[...Array(6)].map((_, i) => (
//                             <li key={i} className="p-2 border-bottom chat-item">
//                               <Link to="#" className="d-flex justify-content-between text-decoration-none">
//                                 <div className="d-flex flex-row">
//                                   <div>
//                                     <img
//                                       src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${i + 1}-bg.webp`}
//                                       alt="avatar"
//                                       className="d-flex align-self-center me-3"
//                                       width={60}
//                                     />
//                                     <span className="badge bg-success badge-dot" />
//                                   </div>
//                                   <div className="pt-1">
//                                     <p className="fw-bold mb-0">User {i + 1}</p>
//                                     <p className="small text-muted">Hello, Are you there?</p>
//                                   </div>
//                                 </div>
//                                 <div className="pt-1">
//                                   <p className="small text-muted mb-1">Just now</p>
//                                   <span className="badge bg-danger rounded-pill float-end">3</span>
//                                 </div>
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Chat Section */}
//                   <div className="col-md-6 col-lg-7 col-xl-8 d-flex flex-column justify-content-between">
//                   <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
//                       <div className="d-flex align-items-center">
//                         <img
//                           src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
//                           alt="avatar"
//                           className="rounded-circle"
//                           width={35}
//                           height={'100%'}
//                         />
//                         <div className="ms-2">
//                           <p className="mb-0 fw-bold">John Doe</p>
//                           <small className="text-success">Online</small>
//                         </div>
//                       </div>
//                     </div>
//                     <div
//                       className="pt-3 pe-3"
//                       style={{ height: 400, overflowY: "scroll", overflowX: "hidden" }}
//                     >
//                       {[...Array(6)].map((_, i) => (
//                         <div key={i} className={`d-flex flex-row ${i % 2 === 0 ? "justify-content-start" : "justify-content-end"}`}>
//                           {i % 2 === 0 && (
//                             <img
//                               src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
//                               alt="avatar"
//                               style={{ width: 45, height: "100%" }}
//                             />
//                           )}
//                           <div>
//                             <p className={`small p-2 ${i % 2 === 0 ? "ms-3" : "me-3"} mb-1 rounded-3 ${i % 2 === 0 ? "bg-body-tertiary" : "text-white bg-primary"}`}>
//                               Message {i + 1}
//                             </p>
//                             <p className="small text-muted float-end">12:00 PM | Aug 13</p>
//                           </div>
//                           {i % 2 !== 0 && (
//                             <img
//                               src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
//                               alt="avatar"
//                               style={{ width: 45, height: "100%" }}
//                             />
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                     {/* Input Field */}
//                     <div className="text-muted d-flex align-items-center p-3 bg-body-secondary">
//                       <img
//                         src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
//                         alt="avatar"
//                         style={{ width: 40, height: "100%" }}
//                       />
//                       <input
//                         type="text"
//                         className="form-control form-control-md mx-2"
//                         placeholder="Type message"
//                       />
//                       <Link to="#" className="ms-2"><i className="bi bi-send h4"></i></Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for Hover Effect */}
//       <style>
//         {`
//           .chat-item:hover {
//             background-color: #f1f1f1 !important;
//             cursor: pointer;
//           }
//         `}
//       </style>

//     </section>
//     </>
//   )
// }

// export default App





