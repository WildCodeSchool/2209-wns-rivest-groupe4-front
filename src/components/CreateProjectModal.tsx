import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const CREATE_PROJECT = gql`
  mutation CreateProject(
    $userId: String!
    $description: String!
    $name: String!
    $public: Boolean!
  ) {
    createProject(
      userId: $userId
      description: $description
      name: $name
      isPublic: $public
    ) {
      id
    }
  }
`;

export default function CreateProjectModal() {
  const { user } = useContext(UserContext);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    description: "",
    public: false,
  });

  const navigate = useNavigate();

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    onCompleted: (data) => {
      navigate(`/editor/${data.createProject.id}`);
    },
  });
  // TODO Gérer les erreurs

  const handleCreateNewProject = () => {
    createProject({
      variables: {
        ...newProjectData,
        userId: user?.id,
      },
    });
  };

  return (
    <>
      <Button onClick={() => setShowCreateProjectModal(true)}>
        Create a project
      </Button>
      <Modal
        show={showCreateProjectModal}
        onClose={() => setShowCreateProjectModal(false)}
      >
        <Modal.Header>About your project</Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Label htmlFor="projectName" value="Name of the project" />
              <TextInput
                id="projectName"
                value={newProjectData.name}
                type="text"
                placeholder="iLoveJS"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewProjectData({
                    ...newProjectData,
                    name: e.target.value,
                  })
                }
                required
              />
              <Label htmlFor="projectDescription" value="Description" />
              <TextInput
                id="projectDescription"
                type="text"
                placeholder="Algorithm to be richer than Elon"
                value={newProjectData.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewProjectData({
                    ...newProjectData,
                    description: e.target.value,
                  })
                }
                required
              />
              <div className="m-4">
                <h3 className="block w-full text-center">Set Privacy</h3>
                <div className="flex mx-10 my-2 justify-evenly">
                  <Label
                    className="flex flex-row-reverse"
                    htmlFor="status-public"
                  >
                    <span className="mx-2">Public</span>
                    <Checkbox
                      id="status-public"
                      checked={newProjectData.public}
                      onChange={() =>
                        setNewProjectData({
                          ...newProjectData,
                          public: !newProjectData.public,
                        })
                      }
                    />
                  </Label>
                </div>
              </div>
              <div className="grid place-items-center">
                <Button onClick={handleCreateNewProject}>Create</Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
