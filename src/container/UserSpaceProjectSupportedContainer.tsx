import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";
import IProjectsListing from "../interfaces/IProjectsListing";
import { UserContext } from "../contexts/UserContext";

const GET_PROJECTS_SUPPORTED = gql`
  query Query($userId: String!) {
    getProjectsSupported(userId: $userId) {
      comments {
        id
      }
      createdAt
      description
      updatedAt
      name
      isPublic
      id
      likes {
        user {
          id
          pseudo
        }
      }
      user {
        id
        pseudo
      }
    }
  }
`;

function UserSpaceProjectSupportedContainer() {
  const { user } = useContext(UserContext);

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
          <p key="key">{el.id}</p>
          // <ProjectsListing
          //   id={el.id}
          //   comments={el.comments}
          //   description={el.description}
          //   likes={el.likes}
          //   name={el.name}
          //   updatedAt={el.updatedAt}
          //   isPublic={el.isPublic}
          //   user={el.user}
          //   key={el.id}
          // />
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
