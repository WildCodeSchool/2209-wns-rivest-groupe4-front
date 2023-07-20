import React from "react";
import ITokenWithUserValues from "../interfaces/ITokenWithUser";

const AuthContext = React.createContext<{
  signIn: (data: ITokenWithUserValues) => void;
  signOut: () => void;
  signUp: (data: ITokenWithUserValues) => void;
  authState: {
    isLoading: boolean;
    isSignout: boolean;
    userToken: string | null | undefined;
  };
}>({
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
  authState: {
    isLoading: true,
    isSignout: false,
    userToken: null,
  },
});

export default AuthContext;
