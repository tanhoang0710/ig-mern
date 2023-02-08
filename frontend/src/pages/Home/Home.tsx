import React from "react";
import { useNavigate } from "react-router-dom";
import CircleAvatar from "../../components/CircleAvatar";
import UserAvatarStory from "../../components/UserAvatarStory";
import UserStory from "../../components/UserStory";
import { useAppSelector } from "../../store/hooks";
import styles from "./styles.module.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const userAuth = useAppSelector((state) => state.auth.authUser);
  console.log("🚀 ~ file: Home.tsx:9 ~ userAuth", userAuth?.avatar);
  return (
    <div
      onClick={() => {
        // navigate("/123");
      }}
      className={"flex flex-row justify-center"}
    >
      <div className={styles.container_feed}>
        <UserStory />
      </div>
      <div className={styles.suggestions}>Div Right</div>
    </div>
  );
};

export default Home;
