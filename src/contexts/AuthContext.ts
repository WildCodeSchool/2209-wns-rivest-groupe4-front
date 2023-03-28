import React from "react";
import ITokenWithUserValues from "../interfaces/ITokenWithUser";

const AuthContext = React.createContext<{
  signIn: (data: ITokenWithUserValues) => void;
  signOut: () => void;
  signUp: (data: ITokenWithUserValues) => void;
}>({
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
});

export default AuthContext;
