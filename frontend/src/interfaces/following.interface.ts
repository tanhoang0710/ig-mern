import { IUser } from "./user.interface";

export interface IFollowing {
  followee: IUser;
  following: boolean;
  followed: boolean;
  followEachOther: boolean;
}
