import { IUser } from "./user.interface";

export interface IPost {
  id: string;
  user: IUser;
  image: string[];
  created_at: string;
  liked_by: IUser;
  caption: string;
  tagged_user: IUser[];
}
