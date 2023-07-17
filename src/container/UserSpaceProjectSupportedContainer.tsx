import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";
import IProjectsListing from "../interfaces/IProjectsListing";
import { GET_PROJECTS_SUPPORTED } from "../apollo/queries";
import IUser from "../interfaces/IUser";
import ProjectsListing from "../components/ProjectListing";

interface IUserInformationsProps {
  user: IUser;
}

function UserSpaceProjectSupportedContainer({ user }: IUserInformationsProps) {
  const [supportedProjects, setSupportedProject] =
    useState<IProjectsListing[]>();

  useQuery(GET_PROJECTS_SUPPORTED, {
    variables: { userId: user?.id },
    onCompleted(data: { getProjectsSupported: IProjectsListing[] }) {
      setSupportedProject(data.getProjectsSupported);
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-aldrich text-3xl">Projects supported :</h1>
      {supportedProjects && supportedProjects?.length > 0 ? (
        supportedProjects.map((el) => (
          <ProjectsListing key={el.id} project={el} />
        ))
      ) : (
        <div className="my-32 flex flex-col justify-center items-center gap-4">
          <p>No project supported yet...</p>
          <NavLink to="/shares">
            <Button
              type="submit"
              gradientDuoTone="cyanToBlue"
              className="m-auto"
            >
              GO TO BEST SHARES
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default UserSpaceProjectSupportedContainer;
