import React from "react";
import "./styles.css";

interface IProps {
  icon: JSX.Element;
  activeIcon: JSX.Element;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<IProps> = ({ activeIcon, icon, isActive, onClick, title }) => {
  return (
    <div className="nav_item" onClick={onClick}>
      {isActive ? activeIcon : icon}
      <p className="text-base pl-4" style={{ fontWeight: isActive ? "600" : "normal" }}>
        {title}
      </p>
    </div>
  );
};

export default NavItem;
