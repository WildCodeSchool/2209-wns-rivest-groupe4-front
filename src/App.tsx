import { useEffect, useMemo, useReducer, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavbarContainer from "./container/NavbarContainer";
import AuthContext from "./contexts/AuthContext";
import { User, UserContext } from "./contexts/UserContext";
import "./index.css";
import ITokenWithUserValues from "./interfaces/ITokenWithUser";
import ChooseProjectScreen from "./screens/ChooseProjectScreen";
import ContactScreen from "./screens/ContactScreen";
import EditorScreen from "./screens/EditorScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MobileCodeEditorScreen from "./screens/MobileCodeEditorScreen";
import PremiumScreen from "./screens/PremiumScreen";
import ProjectDetailsScreen from "./screens/ProjectDetailsScreen";
import RedirectScreen from "./screens/RedirectScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SharesScreen from "./screens/SharesScreen";
import UserSpaceScreen from "./screens/UserSpaceScreen";

type ReducerState = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null | undefined;
};

type ReducerAction = {
  type: "RESTORE_TOKEN" | "SIGN_IN" | "SIGN_OUT";
  token: string | null | undefined;
};

const initialState: ReducerState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

const reducer = (prevState: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
    default:
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authState, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userTokenStorage = localStorage.getItem("token");
    const userStorage = localStorage.getItem("user");

    if (userStorage && userTokenStorage) {
      dispatch({ type: "RESTORE_TOKEN", token: userTokenStorage });
      setUser(JSON.parse(userStorage));
    }
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: (data: ITokenWithUserValues) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        dispatch({ type: "SIGN_IN", token: data.token });
      },
      signOut: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        dispatch({
          type: "SIGN_OUT",
          token: null,
        });
      },
      signUp: (data: ITokenWithUserValues) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        dispatch({ type: "SIGN_IN", token: data.token });
      },
    }),
    [],
  );
  return (
    <AuthContext.Provider value={authContext}>
      <UserContext.Provider value={{ user, setUser }}>
        <main className="flex flex-col w-full h-screen relative">
          <NavbarContainer />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/editor/:idProject" element={<EditorScreen />} />

            <Route
              path="/project-details/:idProject"
              element={<ProjectDetailsScreen />}
            />
            <Route path="/choose" element={<ChooseProjectScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/shares" element={<SharesScreen />} />
            <Route path="/user-space" element={<UserSpaceScreen />} />
            <Route path="/premium" element={<PremiumScreen />} />
            <Route path="/redirect" element={<RedirectScreen />} />
            <Route
              path="/mobile-code-editor"
              element={<MobileCodeEditorScreen />}
            />
          </Routes>
        </main>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
