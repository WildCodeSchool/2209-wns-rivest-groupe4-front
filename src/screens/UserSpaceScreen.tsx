import React, { useContext } from "react";
import UserSpaceMyInformationsContainer from "../container/UserSpaceMyInformationsContainer";
import UserSpaceMyProjectsContainer from "../container/UserSpaceMyProjectsContainer";
import UserSpaceProjectSupportedContainer from "../container/UserSpaceProjectSupportedContainer";
import UserSpaceMyAccountAccessContainer from "../container/UserSpaceMyAccountAccessContainer";
import { UserContext } from "../contexts/UserContext";
// import { useNavigate } from "react-router-dom";

function UserSpaceScreen() {
  const { user } = useContext(UserContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //   user === null && navigate("/login");
  // });

  return (
    <div className="pb-10">
      <div className="flex flex-col h-full gap-16 mx-32 my-10">
        <div className="flex w-full justify-center">
          <h1 className="font-aldrich text-6xl">My account</h1>
        </div>
        {user && (
          <>
            <UserSpaceMyInformationsContainer />
            <UserSpaceMyProjectsContainer />
            <UserSpaceProjectSupportedContainer />
            <UserSpaceMyAccountAccessContainer />
          </>
        )}
      </div>
    </div>
  );
}

export default UserSpaceScreen;
