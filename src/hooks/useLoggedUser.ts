import { ApolloError, ApolloQueryResult, useQuery } from "@apollo/client";
import { GET_LOGGED_USER } from "../apollo/queries";
import IUser from "../interfaces/IUser";

interface Result {
  loading: boolean;
  error: ApolloError | undefined;
  user: IUser;
  refetch: () => Promise<ApolloQueryResult<IUser>>;
}

export default function useLoggedUser(): Result {
  const { loading, error, data, refetch } = useQuery(GET_LOGGED_USER, {
    skip: localStorage.getItem("token") === null,
  });

  const user = {
    id: data?.getLoggedUser.id,
    email: data?.getLoggedUser.email,
    pseudo: data?.getLoggedUser.pseudo,
    premium: data?.getLoggedUser.premium,
    dailyRuns: data?.getLoggedUser.dailyRuns,
  };

  return { loading, error, user, refetch };
}
