import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../layout/Sidebar/Sidebar";
import styles from "./styles.module.css";

const RootPage: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [tabActive, setTabActive] = useState<string>("home");

  const handleNavigate = useCallback(
    (url: string) => {
      navigate(`/${url}`);
    },
    [navigate]
  );

  useEffect(() => {
    handleNavigate(tabActive);
  }, [tabActive]);

  return (
    <div className={`${styles.layout}`}>
      <SideBar onClickTab={setTabActive} tabActive={tabActive} />
      {children}
    </div>
  );
};

export default RootPage;
