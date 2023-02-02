import React from "react";
import IconHome from "../../components/Icon/IconHome";
import IconHomeActive from "../../components/Icon/IconHomeActive";
import IconSearch from "../../components/Icon/IconSearch";
import IconSearchActive from "../../components/Icon/IconSearchActive";
import LogoInstagram from "../../components/LogoInstagram";
import NavItem from "../../components/NavItem";
import styles from "./styles.module.css";

const SideBar: React.FC = () => {
  return (
    <div className={`${styles.sidebar}`}>
      <div className="cursor-pointer mb-2 mt-5 px-3 pt-5 pb-4">
        <LogoInstagram />
      </div>
      <NavItem
        icon={<IconHome />}
        activeIcon={<IconHomeActive />}
        title={"Home"}
        isActive={true}
        onClick={function (): void {
          console.log("Home tab");
        }}
      />
      <NavItem
        icon={<IconSearch />}
        activeIcon={<IconSearchActive />}
        title={"Search"}
        isActive={false}
        onClick={function (): void {
          console.log("Search tab");
        }}
      />
    </div>
  );
};

export default SideBar;
