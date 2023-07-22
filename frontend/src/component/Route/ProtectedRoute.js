/* import { useSelector } from "react-redux";
import { Route } from "react-router-dom"; */
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useSelector } from "react-redux";

const ProtectedRoute = ({children}) => {
  const {loading,isAuthenticated}=useSelector(state=>state.user);
  
  if(loading===false)
  {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }
    return children;
  }
  return <Loader/>;
};

export default ProtectedRoute;