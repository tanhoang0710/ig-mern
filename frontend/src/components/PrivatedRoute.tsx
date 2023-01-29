import React from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const PrivatedRoute: React.FC<IProps> = ({ children }) => {
  if (1 < 2) {
    return <Navigate to="/" replace />;
  }
  return <div>{children}</div>;
};

export default PrivatedRoute;
