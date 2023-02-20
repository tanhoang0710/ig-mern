import React from "react";
import IconClose from "./IconClose";
import ItemRow from "./ItemRow";
import ButtonLink from "./ButtonLink";
import { IFollower } from "../interfaces/follow.interface";

interface IProps {
  setShowModal: (value: React.SetStateAction<boolean>) => void;
  data: IFollower[];
  onHandleFollow: () => Promise<void>;
}

const ModalFollow: React.FC<IProps> = ({ setShowModal, data, onHandleFollow }) => {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setShowModal(false)}></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-[400px] max-w-lg mx-auto bg-white rounded-xl shadow-lg">
            <div className="p-2 border-b border-solid border-slate-200 rounded-t text-black">
              <h3 className="text-[16px] font-semibold text-center grow">Followers</h3>
              <button
                className="p-1 ml-auto border-0 text-black absolute top-2 right-2 text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <IconClose />
              </button>
            </div>
            <div className="p-4">
              {data?.map((e, index) => {
                console.log("🚀 ~ file: ModalFollow.tsx:66 ~ {data?.map ~ e", e);
                return (
                  <ItemRow
                    key={index}
                    url={e.follower?.avatar}
                    title={e.follower.username}
                    size={34}
                    rightItem={<ButtonLink outline={false} textBtn="Follow" onClick={onHandleFollow} />}
                    subTitleItem={
                      <p className="text-xs text-secondary-text text-ellipsis font-medium">{e.follower.fullname}</p>
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

export default ModalFollow;
