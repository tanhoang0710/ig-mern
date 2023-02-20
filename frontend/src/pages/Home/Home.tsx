import React from "react";
import { listPosts } from "../../common/data/listPosts";
import ButtonLink from "../../components/ButtonLink";
import ItemRow from "../../components/ItemRow";
import { ListSuggestion } from "../../components/ListSuggestions";
import PostItem from "../../components/PostItem";
import UserStory from "../../components/UserStory";
import { useAppSelector } from "../../store/hooks";
import styles from "./styles.module.css";

const Home: React.FC = () => {
  const userAuth = useAppSelector((state) => state.auth.authUser);
  console.log("🚀 ~ file: Home.tsx:9 ~ userAuth", userAuth);
  return (
    <div
      onClick={() => {
        // navigate("/123");
      }}
      className={"flex flex-row justify-center pb-16"}
    >
      <div className={styles.container_feed}>
        <UserStory />

        {listPosts?.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </div>
      <div className={styles.suggestions}>
        <ItemRow
          url={userAuth?.avatar}
          title={userAuth?.username}
          subTitle={userAuth?.fullname}
          rightItem={
            <ButtonLink
              outline
              textBtn={"Switch"}
              onClick={(): void => {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
        <div className="flex flex-row justify-between">
          <p className="font-bold text-secondary-text text-[14px]">Suggestions For You</p>
          <button className="text-xs font-bold">See All</button>
        </div>

        <ListSuggestion />
      </div>
    </div>
  );
};

export default Home;
