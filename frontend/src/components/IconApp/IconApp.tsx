import React from "react";

interface IProps {
  icon: JSX.Element;
  onClick: () => void;
  className?: string;
}

const IconApp: React.FC<IProps> = ({ icon, onClick, className }) => {
  return (
    <div className={`p-2 cursor-pointer ${className}`} onClick={onClick}>
      {icon}
    </div>
  );
};

export default IconApp;
