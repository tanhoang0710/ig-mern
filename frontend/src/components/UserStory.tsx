import React, { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { listStories } from "../common/data/listStories";
import "./styles.css";
import UserAvatarStory from "./UserAvatarStory";

const UserStory: React.FC = () => {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>; // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  return (
    <div className="mt-6 bg-white border-[1px] rounded-lg whitespace-nowrap overflow-x-hidden" {...events} ref={ref}>
      {listStories.map((story) => (
        <div className="py-4 px-[6px] first:ml-3 last:pr-6 cursor-pointer inline-block" key={story.id}>
          <div className="flex flex-col justify-center items-center">
            <UserAvatarStory haveSeenBefore={story.haveSeenBefore} size={56} url={story.avatar} />
            <p
              className="text-ellipsis overflow-hidden max-w-[74px] text-xs pt-[6px] px-[2px]"
              style={{ color: story.haveSeenBefore ? "#8e8e8e" : "black" }}
            >
              {story.userName.replace("#", "").trimStart()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStory;
