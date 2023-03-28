import React, { useState } from "react";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Modal, Spinner } from "flowbite-react";
import { gql, useMutation } from "@apollo/client";

type Props = {
  projectId: number;
};

const DELETE_PROJECT = gql`
  mutation Mutation($deleteProjectId: Float!) {
    deleteProject(id: $deleteProjectId)
  }
`;

function DeleteProjectModal({ projectId }: Props) {
  const [show, setShow] = useState(false);

  const [deleteProject, { loading }] = useMutation(DELETE_PROJECT);

  const handleDelete = async () => {
    await deleteProject({
      variables: {
        deleteProjectId: Number(projectId),
      },
    });
    setShow(false);
  };

  return (
    <>
      <button type="button" onClick={() => setShow(true)}>
        <XMarkIcon className="h-5 w-5" />
      </button>
      <Modal show={show} size="md">
        <Modal.Body>
          <div className="text-center">
            <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this project ?
            </h3>
            <div className="flex justify-center gap-4">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <Button color="failure" onClick={handleDelete}>
                    Yes, I&apos;m sure
                  </Button>
                  <Button color="gray" onClick={() => setShow(false)}>
                    No, cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteProjectModal;
