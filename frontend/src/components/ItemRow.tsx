import React from "react";
import CircleAvatar from "./CircleAvatar";

interface IProps {
  leftItem?: JSX.Element;
  url?: string;
  size?: number;
  bodyItem?: JSX.Element;
  title?: string;
  subTitle?: string;
  subTitleItem?: JSX.Element;
  rightItem?: JSX.Element;
}

const ItemRow: React.FC<IProps> = ({
  leftItem,
  url,
  size = 56,
  bodyItem,
  title,
  rightItem,
  subTitle,
  subTitleItem,
}) => {
  return (
    <div className="flex flex-row items-center my-4">
      {leftItem ?? (
        <CircleAvatar
          url={url!}
          size={size}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
      {bodyItem ?? (
        <div className="flex flex-col px-3 grow">
          <p className="text-sm font-semibold cursor-pointer">{title}</p>
          {subTitleItem ?? <p className="text-sm font-medium text-secondary-text text-ellipsis">{subTitle}</p>}
        </div>
      )}
      {rightItem}
    </div>
  );
};

export default ItemRow;
