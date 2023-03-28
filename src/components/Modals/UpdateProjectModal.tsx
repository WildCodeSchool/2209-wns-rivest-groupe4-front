import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button, Modal, Spinner } from "flowbite-react";
import { gql, useMutation } from "@apollo/client";
import IProjectsListing from "../../interfaces/IProjectsListing";

type Props = {
  project: IProjectsListing;
};

const UPDATE_PROJECT = gql`
  mutation Mutation(
    $modifyProjectId: Float!
    $description: String
    $name: String
  ) {
    modifyProject(id: $modifyProjectId, description: $description, name: $name)
  }
`;

function UpdateProjectModal({ project }: Props) {
  const { id, name, description } = project;
  const [show, setShow] = useState(false);
  const [projectData, setProjectData] = useState({
    name,
    description,
  });

  const [updateProject, { loading }] = useMutation(UPDATE_PROJECT);

  const handleSave = async () => {
    await updateProject({
      variables: {
        ...projectData,
        modifyProjectId: Number(id),
      },
    });
    setShow(false);
  };

  return (
    <>
      <button type="button" onClick={() => setShow(true)}>
        <PencilSquareIcon className="h-5 w-5" />
      </button>
      <Modal show={show} size="md" popup onClose={() => setShow(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Update the project
            </h3>
            <div className="col-span-6 sm:col-span-3">
              <span className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </span>
              <input
                type="text"
                name="name"
                value={projectData.name}
                onChange={(e) => {
                  setProjectData({
                    ...projectData,
                    name: e.target.value,
                  });
                }}
                id="name"
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <span className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </span>
              <textarea
                name="description"
                value={projectData.description}
                onChange={(e) => {
                  setProjectData({
                    ...projectData,
                    description: e.target.value,
                  });
                }}
                id="description"
                className=" resize-none mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="w-full">
              <Button gradientDuoTone="cyanToBlue" onClick={handleSave}>
                {loading && (
                  <div className="mr-3">
                    <Spinner size="sm" />
                  </div>
                )}
                Save the changes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateProjectModal;
