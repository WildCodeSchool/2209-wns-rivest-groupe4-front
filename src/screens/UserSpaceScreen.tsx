import React from "react";
import UserSpaceMyInformationsContainer from "../container/UserSpaceMyInformationsContainer";
import UserSpaceMyProjectsContainer from "../container/UserSpaceMyProjectsContainer";
import UserSpaceProjectSupportedContainer from "../container/UserSpaceProjectSupportedContainer";
import UserSpaceMyAccountAccessContainer from "../container/UserSpaceMyAccountAccessContainer";
import useLoggedUser from "../hooks/useLoggedUser";

function UserSpaceScreen() {
  const { user, refetch } = useLoggedUser();
  return (
    <div className="pb-10">
      <div className="flex flex-col h-full gap-16 mx-32 my-10">
        <div className="flex w-full justify-center">
          <h1 className="font-aldrich text-6xl">My account</h1>
        </div>
        <UserSpaceMyInformationsContainer user={user} refetch={refetch} />
        <UserSpaceMyProjectsContainer user={user} />
        <UserSpaceProjectSupportedContainer user={user} />
        <UserSpaceMyAccountAccessContainer user={user} />
      </div>
    </div>
  );
}

export default UserSpaceScreen;
