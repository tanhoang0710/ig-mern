import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/");
      }}
    >
      NotFound
    </div>
  );
};

export default NotFound;
