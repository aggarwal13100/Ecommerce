/* import { useSelector } from "react-redux";
import { Route } from "react-router-dom"; */
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useSelector } from "react-redux";

const ProtectedRoute = ({children , isAdmin}) => {
  const {loading,isAuthenticated , user}=useSelector(state=>state.user);
  
  if(loading===false)
  {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }
    if (isAdmin === true && !user && user.role !== "admin") {
      return <Navigate to="/login" />;
    }
    return children;
  }
  return <Loader/>;
};

export default ProtectedRoute;