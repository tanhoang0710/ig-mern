import React from "react";

interface IProps {
  textBtn: string;
  onClick: () => void;
}

const ButtonLink: React.FC<IProps> = ({ onClick, textBtn }) => {
  return (
    <button className="text-primary-button text-xs font-bold" onClick={onClick}>
      {textBtn}
    </button>
  );
};

export default ButtonLink;
