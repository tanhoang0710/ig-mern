import { UserStory } from "../data/listStories";

export interface IPost {
  id: string;
  user: UserStory;
  isLiked: boolean;
  description: string;
  totalLike: number;
  totalCmt: number;
  image: string;
}
