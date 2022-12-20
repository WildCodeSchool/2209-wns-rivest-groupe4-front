import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";

interface INavbarProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

function UserNavbar({ opened, setOpened }: INavbarProps) {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    setOpened(!opened);
    localStorage.clear();
  };

  return (
    <div>
      {opened ? (
        !token ? (
          <div
            className="p-6 hover:cursor-pointer"
            onClick={() => setOpened(!opened)}
          >
            <img className="w-8 h-8" src="assets/user.svg" alt="user" />
            <ul className="absolute flex flex-col justify-center items-center border-b-2 border-l-2 border-white bg-black/30 h-fit w-52 top-20 right-0 ">
              <NavLink
                to="/login"
                className="p-4 border-b-2 border-white w-full text-center hover:bg-black/40"
                onClick={() => setOpened(!opened)}
              >
                <li className="flex flex-row justify-start items-center gap-4 ml-6">
                  <span>
                    <img
                      className="w-6 h-6 mr-2.5"
                      src="assets/login.svg"
                      alt="login"
                    />
                  </span>
                  Login
                </li>
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setOpened(!opened)}
                className="p-4 w-full h-full text-center hover:bg-black/40"
              >
                <li className="flex flex-row justify-start items-center gap-4 ml-6">
                  <span>
                    <img
                      className="w-6 h-6"
                      src="assets/register.svg"
                      alt="register"
                    />
                  </span>
                  Register
                </li>
              </NavLink>
            </ul>
          </div>
        ) : (
          <div
            className="p-6 hover:cursor-pointer"
            onClick={() => setOpened(!opened)}
          >
            <img className="w-8 h-8" src="assets/user.svg" alt="user" />
            <ul className="absolute flex flex-col justify-center items-center border-b-2 border-l-2 border-white bg-black/30 h-fit w-52 top-20 right-0">
              <NavLink
                to="/user-space"
                className="p-4 border-b-2 border-white w-full text-center hover:bg-black/40"
                onClick={() => setOpened(!opened)}
              >
                <li>My account</li>
              </NavLink>

              <NavLink
                to="/premium"
                className="p-4 border-b-2 border-white w-full text-center hover:bg-black/40"
                onClick={() => setOpened(!opened)}
              >
                <li className="bg-gradient-to-r bg-clip-text text-transparent from-orange-800 via-orange-500 to-yellow-600 animate-premiumColorChanging">
                  Premium access
                </li>
              </NavLink>
              <NavLink
                to="/"
                onClick={handleLogout}
                className="p-4 w-full h-full text-center hover:bg-black/40"
              >
                <li className="flex flex-row justify-start items-center gap-4 ml-6">
                  <span>
                    <img
                      className="w-6 h-6"
                      src="assets/logout.svg"
                      alt="logout"
                    />
                  </span>
                  Logout
                </li>
              </NavLink>
            </ul>
          </div>
        )
      ) : (
        <div
          className="p-6 hover:cursor-pointer"
          onClick={() => setOpened(!opened)}
        >
          <img className="w-8 h-8" src="assets/user.svg" alt="user" />
        </div>
      )}
    </div>
  );
}

export default UserNavbar;
