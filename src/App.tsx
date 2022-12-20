import { Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ContactScreen from "./screens/ContactScreen";
import EditorScreen from "./screens/EditorScreen";
import PremiumScreen from "./screens/PremiumScreen";
import ProjectDetailsScreen from "./screens/ProjectDetailsScreen";
import ProjectsScreen from "./screens/ProjectsScreen";
import RedirectScreen from "./screens/RedirectScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SharesScreen from "./screens/SharesScreen";
import UserSpaceScreen from "./screens/UserSpaceScreen";

import "./index.css";
import NavbarContainer from "./container/NavbarContainer";

function App() {
  const user = 2;
  return (
    <>
      <NavbarContainer />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/editor" element={<EditorScreen />} />
        <Route path="/projects" element={<ProjectsScreen />} />
        <Route path="/project-details" element={<ProjectDetailsScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/shares" element={<SharesScreen />} />
        <Route path="/user-space" element={<UserSpaceScreen />} />
        <Route path="/premium" element={<PremiumScreen />} />
        <Route path="/redirect" element={<RedirectScreen />} />
      </Routes>
    </>
  );
}

export default App;
