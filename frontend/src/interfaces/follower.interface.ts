import { IUser } from "./user.interface";

export interface IFollower {
  follower: IUser;
  following: boolean;
  followed: boolean;
  followEachOther: boolean;
}
