import { IPost } from "./post.interface";

export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  username: string;
  avatar: string;
  posts: IPost[];
  bio: string;
  countFollowers: number;
  countFollowing: number;
}
