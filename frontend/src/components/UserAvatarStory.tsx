import React from "react";
import CircleAvatar from "./CircleAvatar";
import "./styles.css";

interface IProps {
  url: string;
  size: number;
  haveSeenBefore: boolean;
}

const UserAvatarStory: React.FC<IProps> = ({ url, size, haveSeenBefore }) => {
  return (
    <div
      className={
        !haveSeenBefore
          ? "p-[2px] bg-gradient-to-tr from-amber-500 to-fuchsia-600 rounded-full"
          : "border-[1px] rounded-full border-[#d8d6d6]"
      }
    >
      <div className="p-[2px] bg-white rounded-full">
        <CircleAvatar
          url={url}
          size={size}
          onClick={() => {
            console.log("123");
          }}
        />
      </div>
    </div>
  );
};

export default UserAvatarStory;
