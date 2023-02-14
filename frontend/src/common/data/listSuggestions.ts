import { IUser } from "../model/user";

export type Suggestion = {
  user: IUser;
  type: string;
  isFollowing: boolean;
};

export const listSuggestions: Suggestion[] = [
  {
    user: {
      id: "9",
      userName: "#chahcha",
      displayName: "chahcha",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    },
    isFollowing: false,
    type: "Suggested for you",
  },
  {
    user: {
      id: "8",
      userName: "#sancho",
      displayName: "sancho",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    isFollowing: false,
    type: "Follows you",
  },
  {
    user: {
      id: "7",
      userName: "#case",
      displayName: "case",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    isFollowing: false,
    type: "Suggested for you",
  },
  {
    user: {
      id: "34",
      userName: "#monica",
      displayName: "Monica",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    },
    isFollowing: false,
    type: "Suggested for you",
  },
  {
    user: {
      id: "94",
      userName: "#holt",
      displayName: "Eve Holt",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    },
    isFollowing: false,
    type: "Suggested for you",
  },
];
