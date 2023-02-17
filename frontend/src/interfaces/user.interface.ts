import { IPost } from "./post.interface";

export interface IUser {
  id: string;
  fullname: string;
  email: string;
  username: string;
  avatar: string;
  posts: IPost[];
  bio: string;
}
