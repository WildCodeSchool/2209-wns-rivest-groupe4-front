import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToggleSwitch } from "flowbite-react";
import { gql, useMutation } from "@apollo/client";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/20/solid";
import IProjectsListing from "../interfaces/IProjectsListing";
import DeleteProjectModal from "./Modals/DeleteProjectModal";
import UpdateProjectModal from "./Modals/UpdateProjectModal";

type Props = {
  project: IProjectsListing;
};

const UPDATE_PUBLIC_STATE = gql`
  mutation Mutation($modifyProjectId: Float!, $public: Boolean) {
    modifyProject(id: $modifyProjectId, public: $public)
  }
`;

function MyProjectCard({ project }: Props) {
  const { id, comments, name, description, updatedAt, user, likes, isPublic } =
    project;

  const [isPublicLocal, setIsPublicLocal] = useState(isPublic);
  const [modifyPublicState] = useMutation(UPDATE_PUBLIC_STATE);

  useEffect(() => {
    (async () => {
      await modifyPublicState({
        variables: { modifyProjectId: Number(id), public: isPublicLocal },
      });
    })();
  }, [id, isPublicLocal, modifyPublicState]);

  // TODO modal update name and description

  return (
    <div className="relative bg-gray-900 min-h-60">
      <div className="absolute top-2 right-2 z-50 flex gap-1">
        <UpdateProjectModal project={project} />
        <DeleteProjectModal projectId={id} />
      </div>
      <div className="relative h-60 overflow-hidden bg-primary-500 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
        <img
          className="h-full w-full object-cover"
          src="assets/code.jpg"
          alt=""
        />
      </div>
      <div className="relative mx-auto max-w-7xl py-12 sm:py-20 lg:py-20 lg:px-8">
        <div className="pr-6 pl-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
          <div className="flex gap-2 items-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">
              {isPublicLocal ? "Public" : "Private"}
            </h2>
            <ToggleSwitch
              checked={isPublicLocal}
              label="Public"
              onChange={() => setIsPublicLocal(!isPublicLocal)}
            />
            <div className="flex gap-0.5 items-center">
              <span>{likes.length}</span>
              <HeartIcon className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex gap-0.5 items-center">
              <span>{comments.length}</span>
              <ChatBubbleLeftIcon className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {name}
          </p>
          <p className="mt-6 text-base leading-7 text-gray-300">
            {description}
          </p>
          <div className="mt-8">
            <NavLink
              to={`/project-details/${id}`}
              className="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Access the project
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProjectCard;
