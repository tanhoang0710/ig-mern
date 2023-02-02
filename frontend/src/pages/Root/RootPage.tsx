import React from "react";
import SideBar from "../../layout/Sidebar/Sidebar";
import styles from "./styles.module.css";

const RootPage: React.FC = () => {
  return (
    <div className={`${styles.layout}`}>
      <SideBar />
      <div>Content</div>
    </div>
  );
};

export default RootPage;
