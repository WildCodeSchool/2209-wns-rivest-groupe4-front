import IUser from "./IUser";
import ILike from "./ILike";
import IComment from "./IComment";

export default interface IProjectsListing {
  id: number;
  name: string;
  description: string;
  updatedAt: Date;
  user: IUser;
  likes: ILike[];
  comments: IComment[];
}
