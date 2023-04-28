import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import MyProjectCard from "../components/MyProjectCard";
import IProjectsListing from "../interfaces/IProjectsListing";
import useLoggedUser from "../hooks/useLoggedUser";
import { GET_PROJECTS } from "../apollo/queries";

function UserSpaceMyProjectsContainer() {
  const { user } = useLoggedUser();
  const [userProjects, setUserProjects] = useState<IProjectsListing[]>();

  useQuery(GET_PROJECTS, {
    variables: { userId: user?.id },
    onCompleted(data: { getProjectsByUserId: IProjectsListing[] }) {
      setUserProjects(data.getProjectsByUserId);
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="px-4 sm:px-0">
        <h3 className="font-aldrich text-2xl leading-6 ">My projects</h3>
      </div>
      {userProjects?.map((project) => (
        <MyProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default UserSpaceMyProjectsContainer;
