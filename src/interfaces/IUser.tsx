export default interface IUser {
  id: string;
  email: string;
  pseudo: string;
  hashedPassword: string;
  premium: boolean;
  dailyRuns: number;
}
