import { Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ContactScreen from "./screens/ContactScreen";
import EditorScreen from "./screens/EditorScreen";
import PremiumScreen from "./screens/PremiumScreen";
import ProjectDetailsScreen from "./screens/ProjectDetailsScreen";
import RedirectScreen from "./screens/RedirectScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SharesScreen from "./screens/SharesScreen";
import UserSpaceScreen from "./screens/UserSpaceScreen";

import "./index.css";
import NavbarContainer from "./container/NavbarContainer";
import MobileCodeEditorScreen from "./screens/MobileCodeEditorScreen";
import ChooseProjectScreen from "./screens/ChooseProjectScreen";

function App() {
  return (
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
  );
}

export default App;
