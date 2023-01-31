import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/123");
      }}
    >
      Home
    </div>
  );
};

export default Home;
