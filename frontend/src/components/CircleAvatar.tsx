import React from "react";

interface IProps {
  url: string;
  size: number;
  onClick: () => void;
}

const CircleAvatar: React.FC<IProps> = ({ url, size, onClick }) => {
  return (
    <img
      src={url}
      alt="avatar"
      style={{ width: `${size}px`, height: `${size}px` }}
      onClick={onClick}
      className="rounded-full border-[1px]"
      draggable={false}
    />
  );
};

export default CircleAvatar;
