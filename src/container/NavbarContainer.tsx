import { useState } from "react";
import { NavLink } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

function NavbarContainer() {
  const [opened, setOpened] = useState(false);

  return (
    <nav className="w-full h-fit flex flex-row justify-between border-b-2 items-center bg-black/30">
      <NavLink to="/" className="cursor-default">
        <img
          className="w-30 h-20 tablet:w-20 tablet:h-14 hover:cursor-pointer"
          src="assets/logo.png"
          alt="logo"
        />
      </NavLink>
      <ul className="flex flex-row justify-between font-aldrich text-white text-lg tablet:text-sm  items-center color:white">
        <NavLink
          to="/choose"
          className={(navData) => (navData.isActive ? "bg-black/40" : "")}
          onClick={() => setOpened(false)}
        >
          <li className="border-r-2 border-white p-6">Code Editor</li>
        </NavLink>
        <NavLink
          to="/shares"
          className={(navData) => (navData.isActive ? "bg-black/40" : "")}
          onClick={() => setOpened(false)}
        >
          <li className="border-r-2 border-white p-6">Best Shares</li>
        </NavLink>
        <NavLink
          to="/contact"
          className={(navData) => (navData.isActive ? "bg-black/40" : "")}
          onClick={() => setOpened(false)}
        >
          <li className="border-r-2 border-white p-6">Contact</li>
        </NavLink>
        <li>
          <UserNavbar opened={opened} setOpened={setOpened} />
        </li>
      </ul>
    </nav>
  );
}

export default NavbarContainer;
