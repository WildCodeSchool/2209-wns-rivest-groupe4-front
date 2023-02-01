import IUser from "./IUser";

export default interface ITokenWithUserValues {
  token: string;
  user: IUser;
}
