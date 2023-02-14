import React from "react";
import IconCreate from "../../components/Icon/IconCreate";
import IconCreateActive from "../../components/Icon/IconCreateActive";
import IconExplore from "../../components/Icon/IconExplore";
import IconExploreActive from "../../components/Icon/IconExploreActive";
import IconHome from "../../components/Icon/IconHome";
import IconHomeActive from "../../components/Icon/IconHomeActive";
import IconMessages from "../../components/Icon/IconMessages";
import IconMessagesActive from "../../components/Icon/IconMessagesActive";
import IconNotifications from "../../components/Icon/IconNotifications";
import IconNotificationsActive from "../../components/Icon/IconNotificationsActive";
import IconReels from "../../components/Icon/IconReels";
import IconReelsActive from "../../components/Icon/IconReelsActive";
import IconSearch from "../../components/Icon/IconSearch";
import IconSearchActive from "../../components/Icon/IconSearchActive";
import LogoInstagram from "../../components/LogoInstagram";
import MenuAvatar from "../../components/MenuAvatar";
import NavItem from "../../components/NavItem";
import IconMenu from "../../components/Icon/IconMenu";
import IconMenuActive from "../../components/Icon/IconMenuActive";
import styles from "./styles.module.css";
import { useAppSelector } from "../../store/hooks";

interface IProps {
  tabActive: string;
  onClickTab: (s: string) => void;
}

const SideBar: React.FC<IProps> = ({ tabActive, onClickTab }) => {
  const userAuth = useAppSelector((state) => state.auth.authUser);

  return (
    <div className={`${styles.sidebar}`}>
      <div className="cursor-pointer mb-2 mt-5 px-3 pt-5 pb-4">
        <LogoInstagram />
      </div>
      <div className="grow">
        <NavItem
          icon={<IconHome />}
          activeIcon={<IconHomeActive />}
          title={"Home"}
          isActive={tabActive === "home"}
          onClick={() => onClickTab("home")}
        />
        <NavItem
          icon={<IconSearch />}
          activeIcon={<IconSearchActive />}
          title={"Search"}
          isActive={tabActive === "search"}
          onClick={() => onClickTab("search")}
        />
        <NavItem
          icon={<IconExplore />}
          activeIcon={<IconExploreActive />}
          title={"Explore"}
          isActive={tabActive === "explore"}
          onClick={() => onClickTab("explore")}
        />
        <NavItem
          icon={<IconReels />}
          activeIcon={<IconReelsActive />}
          title={"Reels"}
          isActive={tabActive === "reels/video"}
          onClick={() => onClickTab("reels/video")}
        />
        <NavItem
          icon={<IconMessages />}
          activeIcon={<IconMessagesActive />}
          title={"Messages"}
          isActive={tabActive === "direct/inbox"}
          onClick={() => onClickTab("direct/inbox")}
        />
        <NavItem
          icon={<IconNotifications />}
          activeIcon={<IconNotificationsActive />}
          title={"Notifications"}
          isActive={tabActive === "notifications"}
          onClick={() => onClickTab("notifications")}
        />
        <NavItem
          icon={<IconCreate />}
          activeIcon={<IconCreateActive />}
          title={"Create"}
          isActive={tabActive === "create"}
          onClick={() => onClickTab("create")}
        />
        <NavItem
          icon={<MenuAvatar url={userAuth?.avatar as string} isActive={false} />}
          activeIcon={<MenuAvatar url={userAuth?.avatar as string} isActive={true} />}
          title={"Profile"}
          isActive={tabActive === "profile"}
          onClick={() => onClickTab("profile")}
        />
      </div>
      <div className="mb-6">
        <NavItem
          icon={<IconMenu />}
          activeIcon={<IconMenuActive />}
          title={"More"}
          isActive={tabActive === "more"}
          onClick={() => onClickTab("more")}
        />
      </div>
    </div>
  );
};

export default SideBar;
