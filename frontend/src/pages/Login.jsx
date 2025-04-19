import { useState } from "react";
import axios from '../utils/axios.js'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      console.log(res)
      toast.success('Login Successful!')
      dispatch(setUser(res.data.user));
      navigate("/");
    } catch (err) {
        console.log(err)
        toast.error('Login failed!')
    }
  };

  return (
<section className="h-100 gradient-form" style={{backgroundColor: '#eee'}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">
                <div className="text-center">
                  <h4 className="mt-1 mb-5 pb-1">💬 ChatApp</h4>
                </div>
                <form onSubmit={handleLogin}>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="email" id="form2Example11" className="form-control" placeholder="Email Address" onChange={(e)=> setEmail(e.target.value)}/>
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="password" id="form2Example22" className="form-control" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                  </div>
                  <div className="text-center pt-1 mb-2 pb-1 d-grid">
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Log
                      in</button>
                  </div>
                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-danger" onClick={()=> navigate('/signup')}>Create new</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">🔗 Connect</h4>
                <h4 className="mb-4">📨 Communicate</h4>
                <h4 className="mb-4">🤝 Collaborate</h4>
                <p className="small mb-0">Experience seamless conversations with real-time messaging. Join a modern chat platform built for speed, security, and simplicity. Your next conversation starts here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

   
   <style>
    {`
    .gradient-custom-2 {
/* fallback for old browsers */
background: #fccb90;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
}

@media (min-width: 768px) {
.gradient-form {
height: 100vh !important;
}
}
@media (min-width: 769px) {
.gradient-custom-2 {
border-top-right-radius: .3rem;
border-bottom-right-radius: .3rem;
}
}
    `}
   </style>

</section>

  );
};

export default Login;
