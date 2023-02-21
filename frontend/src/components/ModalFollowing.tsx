import React from "react";
import IconClose from "./IconClose";
import ItemRow from "./ItemRow";
import ButtonLink from "./ButtonLink";
import { IFollowing } from "../interfaces/following.interface";
import { StringUtils } from "../utils/stringUtils";
import { useAppSelector } from "../store/hooks";
import { IUser } from "../interfaces/user.interface";
import axios from "axios";

interface IProps {
  setShowModalFollowing: (value: React.SetStateAction<boolean>) => void;
  data: IFollowing[];
  setListFollowing: React.Dispatch<React.SetStateAction<IFollowing[] | undefined>>;
  user: IUser;
}

const ModalFollowing: React.FC<IProps> = ({ setShowModalFollowing, data, setListFollowing, user }) => {
  const userAuth = useAppSelector((state) => state.auth.authUser);

  const handleFollow = async (e: IUser) => {
    const type = "followings";
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
      setListFollowing(res.data?.followees);
    }
  };

  const handleUnfollow = async (e: IUser) => {
    const type = "followings";
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
      setListFollowing(res.data?.followees);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setShowModalFollowing(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-[400px] max-w-lg mx-auto bg-white rounded-xl shadow-lg">
            <div className="p-2 border-b border-solid border-slate-200 rounded-t text-black">
              <h3 className="text-[16px] font-semibold text-center grow">Followings</h3>
              <button
                className="p-1 ml-auto border-0 text-black absolute top-2 right-2 text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModalFollowing(false)}
              >
                <IconClose />
              </button>
            </div>
            <div className="p-4">
              {data?.map((e, index) => {
                const avatar = StringUtils.formatAvatarNotSocial(e?.followee?.avatar);
                return (
                  <ItemRow
                    key={index}
                    url={avatar}
                    title={e?.followee?.username}
                    size={34}
                    rightItem={
                      userAuth?._id === e.followee._id ? (
                        <></>
                      ) : e.following ? (
                        <button
                          className="bg-post-separator flex items-center justify-center gap-2 rounded-[8px] font-semibold px-[20px] py-[5px] text-[14px]"
                          onClick={() => handleUnfollow(e?.followee)}
                        >
                          Following
                        </button>
                      ) : e.followed ? (
                        <button
                          className="bg-primary-button text-white rounded-[8px] font-semibold px-[20px] py-[5px] text-[14px]"
                          onClick={() => handleFollow(e?.followee)}
                        >
                          Follow Back
                        </button>
                      ) : (
                        <ButtonLink outline={false} textBtn="Follow" onClick={() => handleFollow(e?.followee)} />
                      )
                    }
                    subTitleItem={
                      <p className="text-xs text-secondary-text text-ellipsis font-medium">{e?.followee?.fullname}</p>
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

export default ModalFollowing;
