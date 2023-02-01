import React from "react";
import { useNavigate } from "react-router-dom";
import CircleAvatar from "../../components/CircleAvatar";
import { useAppSelector } from "../../store/hooks";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const userAuth = useAppSelector((state) => state.auth.authUser);
  console.log("🚀 ~ file: Home.tsx:9 ~ userAuth", userAuth?.avatar);
  return (
    <div
      onClick={() => {
        navigate("/123");
      }}
    >
      <CircleAvatar onClick={() => navigate("/123")} size={100} url={userAuth?.avatar as string} />
      Home {userAuth?.fullname}
    </div>
  );
};

export default Home;
