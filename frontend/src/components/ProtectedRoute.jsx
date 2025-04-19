import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <div><Loading/></div>; // Or use spinner

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
