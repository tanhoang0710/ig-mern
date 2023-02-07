import React from "react";

interface IProps {
  url: string;
  size?: number;
  isActive: boolean;
}

const MenuAvatar: React.FC<IProps> = ({ url, size = 24, isActive }) => {
  return (
    <img
      src={url}
      alt="avatar"
      style={{ width: `${size}px`, height: `${size}px`, border: isActive ? "2px solid #000" : "none" }}
      className="rounded-full"
    />
  );
};

export default MenuAvatar;
