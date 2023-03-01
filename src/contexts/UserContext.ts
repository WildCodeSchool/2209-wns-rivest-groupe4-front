import React, { Dispatch, SetStateAction } from "react";

export type User = {
  id: string;
  email: string;
  premium: boolean;
  pseudo: string;
};

const UserContext = React.createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

export { UserContext };
