import { IUser } from "../model/user";
import { IStory } from "./../model/story";
export type UserStory = IUser & IStory;
export const listStories: UserStory[] = [
  {
    id: "1",
    userName: "#brunofernades",
    displayName: "brunofernades",
    haveSeenBefore: false,
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    id: "2",
    userName: "#rachel",
    displayName: "rachel",
    haveSeenBefore: false,
    avatar: "https://randomuser.me/api/portraits/women/75.jpg",
  },
  {
    id: "3",
    userName: "#michael",
    displayName: "michael",
    haveSeenBefore: false,
    avatar: "https://reqres.in/img/faces/6-image.jpg",
  },
  {
    id: "4",
    userName: "#lindsay",
    displayName: "lindsay",
    haveSeenBefore: false,
    avatar: "https://reqres.in/img/faces/7-image.jpg",
  },
  {
    id: "5",
    userName: "#george",
    displayName: "George",
    haveSeenBefore: false,
    avatar: "https://reqres.in/img/faces/9-image.jpg",
  },
  {
    id: "6",
    userName: "#janet",
    displayName: "janet",
    haveSeenBefore: true,
    avatar: "https://reqres.in/img/faces/11-image.jpg",
  },
  {
    id: "7",
    userName: "#case",
    displayName: "case",
    haveSeenBefore: false,
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    id: "8",
    userName: "#sancho",
    displayName: "sancho",
    haveSeenBefore: false,
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: "9",
    userName: "#chahcha",
    displayName: "chahcha",
    haveSeenBefore: true,
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
  },
];
