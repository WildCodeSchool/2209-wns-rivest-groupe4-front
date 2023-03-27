import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import MyProjectCard from "../components/MyProjectCard";
import IProjectsListing from "../interfaces/IProjectsListing";
import { UserContext } from "../contexts/UserContext";

const GET_USER_PROJECTS = gql`
  query Query($userId: String!) {
    getProjectsByUserId(userId: $userId) {
      comments {
        id
      }
      likes {
        user {
          id
          pseudo
        }
      }
      createdAt
      description
      updatedAt
      name
      isPublic
      id
      user {
        id
        pseudo
      }
    }
  }
`;
function UserSpaceMyProjectsContainer() {
  const { user } = useContext(UserContext);
  const [userProjects, setUserProjects] = useState<IProjectsListing[]>();

  useQuery(GET_USER_PROJECTS, {
    variables: { userId: user?.id },
    onCompleted(data: { getProjectsByUserId: IProjectsListing[] }) {
      setUserProjects(data.getProjectsByUserId);
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="px-4 sm:px-0">
        <h3 className="font-aldrich text-2xl leading-6 ">My projects</h3>
      </div>{" "}
      {userProjects?.map((project) => (
        <MyProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default UserSpaceMyProjectsContainer;
