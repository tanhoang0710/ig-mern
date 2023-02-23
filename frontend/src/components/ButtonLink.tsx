import React from "react";

interface IProps {
  textBtn: string;
  onClick: () => void;
  outline?: boolean;
  textMedium?: boolean;
}

const ButtonLink: React.FC<IProps> = ({ onClick, textBtn, outline, textMedium }) => {
  return (
    <button
      className={`${textMedium ? "text-[16px]" : "text-xs"} font-bold ${
        outline ? "text-primary-button" : "bg-primary-button text-white rounded-[8px] px-[18px] py-[8px] text-[14px]"
      }`}
      onClick={onClick}
    >
      {textBtn}
    </button>
  );
};

export default ButtonLink;
