import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("user_id");
  return token ? children : <Navigate to="/main" />;
};

export default PrivateRoute;
