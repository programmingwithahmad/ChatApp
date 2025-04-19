import axios from "axios";
import { store } from "../redux/store.js";
import { logout } from "../redux/slices/authSlice";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API}`,
  withCredentials: true, // to send HttpOnly cookies
});

// Global response error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
      window.location.href = "/login"; // fallback redirect
    }
    return Promise.reject(error);
  }
);

export default instance;
