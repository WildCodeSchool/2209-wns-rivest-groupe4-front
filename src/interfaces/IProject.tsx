import IUser from "./IUser";

export default interface IProject {
  id: number;
  public: boolean;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
