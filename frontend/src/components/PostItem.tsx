import React from "react";
import { IconComment } from "./Icon/IconComment";
import { IconHeart } from "./Icon/IconHeart";
import { IconMore } from "./Icon/IconMore";
import { IconSaved } from "./Icon/IconSaved";
import { IconShare } from "./Icon/IconShare";
import { IconEmoji } from "./Icon/IconEmoji";
import IconApp from "./IconApp/IconApp";
import UserAvatarStory from "./UserAvatarStory";
import "./styles.css";

const PostItem: React.FC = () => {
  return (
    <div className="bg-white mt-4 rounded-lg border-[1px]">
      {/* Header */}
      <div className="flex flex-row my-2 items-center pl-3">
        <UserAvatarStory haveSeenBefore={false} size={44} url={"https://randomuser.me/api/portraits/men/78.jpg"} />
        <div className="flex flex-col grow mx-2">
          <p className="text-sm font-semibold">username</p>
          <p className="text-sm">subtitle</p>
        </div>
        <IconApp
          icon={<IconMore />}
          onClick={() => {
            console.log("123");
          }}
        />
      </div>

      {/* Media */}
      <img
        src="https://images.unsplash.com/photo-1675853501687-6f6ca1667037?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        alt=""
        className="max-h-[30rem] w-full"
        draggable={false}
      />

      {/*List Icon  */}
      <div className="flex flex-row m-1">
        <IconApp
          icon={<IconHeart />}
          onClick={() => {
            console.log("123");
          }}
        />
        <IconApp
          icon={<IconComment />}
          onClick={() => {
            console.log("123");
          }}
        />
        <IconApp
          icon={<IconShare />}
          onClick={() => {
            console.log("123");
          }}
        />

        <div className="grow">
          <IconApp
            className="float-right"
            icon={<IconSaved />}
            onClick={() => {
              console.log("123");
            }}
          />
        </div>
      </div>

      {/* Total likes
        1: Liked (Current user)
        2: Not Yet
      */}
      <div>
        <p className="text-sm ml-3">
          Like by <span className="font-semibold">brunu</span> and <span className="font-semibold">1234 others</span>
        </p>
      </div>

      {/* Desc */}
      <div className="mx-3 my-2">
        <p className="text-sm">
          <span className="font-semibold">brunu</span> abcxyz
        </p>
      </div>

      {/* Total comments */}
      <div className="mx-3 my-2">
        <p className="text-sm font-medium text-secondary-text">View all 1234 comments</p>
      </div>

      {/* Created time */}
      <div className="mx-3 my-2 text-secondary-text text-[10px]">3 HOURS AGO</div>

      {/* Footer */}
      <div className="flex flex-row items-center border-t-[1px] border-t-post-separator mx-1 py-2">
        <IconApp icon={<IconEmoji />} onClick={() => {}} />
        <div className="grow">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full pl-1 pr-5 h-5 focus:outline-none focus:border-transparent"
          />
        </div>
        <button className="mr-3 text-primary-button font-semibold">Post</button>
      </div>
    </div>
  );
};

export default PostItem;
