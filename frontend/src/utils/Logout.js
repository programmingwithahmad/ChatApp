import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import axios from './axios.js'
import { socket } from "../socket.js";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await axios.post("/api/auth/logout", {});
        console.log("Logout success:", res.data);

        dispatch(logout());
        socket.disconnect()
        navigate("/login");
      } catch (err) {
        console.error("Logout failed:", err);
      }
    };

    logoutUser();
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
