import { useState } from "react";
import axios from './../utils/axios.js';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", { username, email, password });
       console.log(res)
       toast.success(res?.data?.message)
      navigate("/login");
    } catch (err) {
        console.log(err)
        toast.error('Signup failed!')
      }
  };

  return (
<section className="background-radial-gradient overflow-auto vh-100">
<div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
  <div className="row gx-lg-5 align-items-center mb-5">
    <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex: 10}}>
      <p className="my-5 display-5 fw-bold ls-tight" style={{color: 'hsl(218, 81%, 95%)'}}>
      A Smarter Way <br />
        <span style={{color: 'hsl(240, 16.70%, 97.60%)'}}>to Stay Connected</span>
      </p>
      <p className="mb-4 opacity-70" style={{color: 'hsl(240, 33.30%, 2.90%)'}}>
      Join our platform to enjoy fast, intuitive, and secure messaging. Whether for personal or professional use — stay in touch, effortlessly.
      </p>
    </div>
    <div className="col-lg-6 mb-5 mb-lg-0 position-relative"> 
      <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong" />
      <div id="radius-shape-2" className="position-absolute shadow-5-strong" />
      <div className="card bg-glass">
        <div className="card-body px-4 py-5 px-md-5">
          <form onSubmit={handleSignup}>
            {/* Email input */}
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="text" id="form3Example3" className="form-control" placeholder="User Name" onChange={(e)=> setUsername(e.target.value)}/>
            </div>
            {/* Email input */}
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="email" id="form3Example3" className="form-control" placeholder="Email address" onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            {/* Password input */}
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="form3Example4" className="form-control" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            {/* Submit button */}
            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-block mb-4">
              Sign up
            </button>
            <p>Alredy have an account? <Link to={'/login'}>Please Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>


  <style>
    {`
    .background-radial-gradient {
      background:linear-gradient(to right, #004ff9, #fff94c)
    }

    #radius-shape-1 {
      height: 220px;
      width: 220px;
      top: -60px;
      left: -130px;
      background: radial-gradient(#44006b, #ad1fff);
      overflow: hidden;
    }

    #radius-shape-2 {
      border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
      bottom: -60px;
      right: -110px;
      width: 300px;
      height: 300px;
      background: radial-gradient(#44006b, #ad1fff);
      overflow: hidden;
    }

    .bg-glass {
      background-color: hsla(0, 0%, 100%, 0.9) !important;
      backdrop-filter: saturate(200%) blur(25px);
    }
    `}
  </style>

</section>
  );
};

export default Signup;
