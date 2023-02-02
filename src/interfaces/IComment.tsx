import IUser from "./IUser";
import IProject from "./IProject";

export default interface IComment {
  id: number;
  comment: string;
  createdAt: Date;
  user: IUser;
  project: IProject;
}
