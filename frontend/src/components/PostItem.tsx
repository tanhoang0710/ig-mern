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
import { IPost } from "../common/model/post";
import { useAppSelector } from "../store/hooks";
import { StringUtils } from "../utils/stringUtils";

interface IProps {
  post: IPost;
}

const PostItem: React.FC<IProps> = ({ post }) => {
  const userAuth = useAppSelector((state) => state.auth.authUser);

  return (
    <div className="bg-white mt-4 rounded-lg border-[1px]">
      {/* Header */}
      <div className="flex flex-row my-2 items-center pl-3">
        <UserAvatarStory haveSeenBefore={false} size={32} url={post.user.avatar} />
        <div className="flex flex-col grow mx-2">
          <p className="text-sm font-semibold">{post.user.userName}</p>
          {/* <p className="text-sm">subtitle</p> */}
        </div>
        <IconApp
          icon={<IconMore />}
          onClick={() => {
            console.log("123");
          }}
        />
      </div>

      {/* Media */}
      <img src={post.image} alt="" className="max-h-[30rem] w-full" draggable={false} />

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
      <div className="text-sm ml-3">
        {post.isLiked ? (
          <p>
            Liked by <span className="font-semibold">{userAuth?.username}</span> and{" "}
            <span className="font-semibold">{StringUtils.formatNumber(post.totalLike - 1)} others</span>
          </p>
        ) : (
          <span className="text-sm font-semibold">{StringUtils.formatNumber(post.totalLike)} likes</span>
        )}
      </div>

      {/* Desc */}
      <div className="mx-3 my-2">
        <p className="text-sm">
          <span className="font-semibold">{post.user.userName}</span> {post.description}
        </p>
      </div>

      {/* Total comments */}
      <div className="mx-3 my-2">
        <p className="text-sm font-medium text-secondary-text">
          View all {StringUtils.formatNumber(post.totalCmt)} comments
        </p>
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
