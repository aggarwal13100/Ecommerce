import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(isAuthenticated , user)  ;
  
         
            if (!isAuthenticated || isAuthenticated === false) {
              return <Navigate to="/login" />;
            }

            if (isAdmin === true && !user && user.role !== "admin") {
              return <Navigate to="/login" />;
            }

            return <Outlet/>;
          
        
};

export default ProtectedRoute;