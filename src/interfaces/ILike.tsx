import IUser from "./IUser";
import IProject from "./IProject";

export default interface ILike {
  id: number;
  user: IUser;
  project: IProject;
}
