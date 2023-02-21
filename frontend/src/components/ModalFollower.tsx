import React, { useState } from "react";
import IconClose from "./IconClose";
import ItemRow from "./ItemRow";
import ButtonLink from "./ButtonLink";
import { IFollower } from "../interfaces/follower.interface";
import { StringUtils } from "../utils/stringUtils";
import { useAppSelector } from "../store/hooks";
import { IUser } from "../interfaces/user.interface";
import axios from "axios";

interface IProps {
  setShowModalFollower: (value: React.SetStateAction<boolean>) => void;
  data: IFollower[];
  setListFollower: React.Dispatch<React.SetStateAction<IFollower[] | undefined>>;
  user: IUser;
}

const ModalFollower: React.FC<IProps> = ({ setShowModalFollower, data, setListFollower, user }) => {
  const userAuth = useAppSelector((state) => state.auth.authUser);

  const handleFollow = async (e: IUser) => {
    const type = "followers";
    const res = await axios.post(`http://localhost:3000/api/v1/follow/${e?._id}`, undefined, {
      withCredentials: true,
    });
    if (res.data?.status === "success") {
      const res = await axios.get(`http://localhost:3000/api/v1/follow/get-follow/${user?._id}`, {
        params: {
          type,
        },
        withCredentials: true,
      });
      setListFollower(res.data?.followers);
    }
  };

  const handleUnfollow = async (e: IUser) => {
    const type = "followers";
    const res = await axios.delete(`http://localhost:3000/api/v1/follow/${e?._id}`, {
      withCredentials: true,
    });
    if (res.data?.status === "success") {
      const res = await axios.get(`http://localhost:3000/api/v1/follow/get-follow/${user?._id}`, {
        params: {
          type,
        },
        withCredentials: true,
      });
      setListFollower(res.data?.followers);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setShowModalFollower(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-[400px] max-w-lg mx-auto bg-white rounded-xl shadow-lg">
            <div className="p-2 border-b border-solid border-slate-200 rounded-t text-black">
              <h3 className="text-[16px] font-semibold text-center grow">Followers</h3>
              <button
                className="p-1 ml-auto border-0 text-black absolute top-2 right-2 text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModalFollower(false)}
              >
                <IconClose />
              </button>
            </div>
            <div className="p-4">
              {data?.map((e, index) => {
                console.log("🚀 ~ file: ModalFollower.tsx:39 ~ {data?.map ~ e:", e);
                const avatar = StringUtils.formatAvatarNotSocial(e?.follower?.avatar);
                return (
                  <ItemRow
                    key={index}
                    url={avatar}
                    title={e?.follower?.username}
                    size={34}
                    rightItem={
                      userAuth?._id === e.follower._id ? (
                        <></>
                      ) : e.following ? (
                        <button
                          className="bg-post-separator flex items-center justify-center gap-2 rounded-[8px] font-semibold px-[20px] py-[5px] text-[14px]"
                          onClick={() => handleUnfollow(e?.follower)}
                        >
                          Following
                        </button>
                      ) : e.followed ? (
                        <button
                          className="bg-primary-button text-white rounded-[8px] font-semibold px-[20px] py-[5px] text-[14px]"
                          onClick={() => handleFollow(e?.follower)}
                        >
                          Follow Back
                        </button>
                      ) : (
                        <ButtonLink outline={false} textBtn="Follow" onClick={() => handleFollow(e?.follower)} />
                      )
                    }
                    subTitleItem={
                      <p className="text-xs text-secondary-text text-ellipsis font-medium">{e?.follower?.fullname}</p>
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFollower;
