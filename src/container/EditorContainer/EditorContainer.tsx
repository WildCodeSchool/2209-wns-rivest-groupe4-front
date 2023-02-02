import {
  Button,
  Checkbox,
  Label,
  ListGroup,
  Modal,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

import EditorAside from "../../components/EditorAside";
import arrowLeft from "../../../public/assets/arrowLeft.svg";
import arrowRight from "../../../public/assets/arrowRight.svg";
import downloadFile from "../../../public/assets/downloadFile.svg";
import saveFile from "../../../public/assets/saveFile.svg";
import shareFile from "../../../public/assets/shareFile.svg";
import ReturnEditor from "../../components/ReturnEditor";
import InputEditor from "../../components/InputEditor";
import {
  CreateNewProjectMutationResult,
  CreateNewProjectMutationVariables,
  ExistingProjectQueryResult,
  ExistingProjectQueryVariables,
} from "./types";

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
      public: $public
    ) {
      id
    }
  }
`;

const GET_CHOSEN_PROJECT = gql`
  query GetOneProject($id: Float!) {
    getOneProject(id: $id) {
      id
      description
      createdAt
      name
      public
      updatedAt
    }
    getAllFoldersByProjectId(idProject: $id) {
      name
      id
      parentFolder {
        name
        id
      }
      files {
        content
        extension
        name
      }
    }
  }
`;

interface Props {
  action: string | null;
  existingProjects: { id: number; name: string }[];
}

function EditorContainer({ action, existingProjects }: Props) {
  // State to determine which modal to show
  const [createModal, setCreateModal] = useState<boolean>(action === "new");
  const [chooseModal, setChooseModal] = useState<boolean>(
    action === "existing",
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // State that defines the editors current value and the code to be sent as mutation input
  const [currentFileContent, setCurrentFileContent] = useState<string>();
  const [currentProject, setCurrentProject] =
    useState<ExistingProjectQueryResult | null>(null);
  const [editorValue, setEditorValue] = useState<string>("");
  const [codeToRun, setCodeToRun] = useState<string>("");

  // State for new project inputs
  const [newProjectDescription, setNewProjectDescription] =
    useState<string>("");
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [newProjectIsPublic, setNewProjectIsPublic] = useState<boolean>(false);

  const handleEditorValidate = () => {
    setCodeToRun(editorValue);
    setIsOpen(true);
  };

  // Defined a query to load an existing project
  const [loadProject, { error: existingProjectError }] = useLazyQuery<
    ExistingProjectQueryResult,
    ExistingProjectQueryVariables
  >(GET_CHOSEN_PROJECT, {
    onCompleted: (data) => {
      setCurrentProject(data);
    },
  });

  if (existingProjectError) {
    console.error(existingProjectError.message);
  }

  // TODO createProject mutation should return the initial project
  // Defined a mutation to create a new project
  const [
    createProject,
    {
      data: newProjectData,
      error: newProjectError,
      loading: newProjectLoading,
    },
  ] = useMutation<
    CreateNewProjectMutationResult,
    CreateNewProjectMutationVariables
  >(CREATE_PROJECT, {
    variables: {
      // TODO replace uuid
      userId: "930a55eb-73ec-4a96-8f83-5dd8552831e8",
      description: newProjectDescription,
      name: newProjectName,
      public: newProjectIsPublic,
    },
    onCompleted: (data) => {
      loadProject({ variables: { id: Number(data.createProject.id) } });
      setCreateModal(false);
    },
  });

  const handleExistingProject = (projectID: number) => {
    loadProject({ variables: { id: Number(projectID) } });
    setChooseModal(false);
  };

  const handleNewProject = () => {
    createProject();
    if (newProjectData) {
      console.warn(newProjectData);
      setCreateModal(false);
    }
    if (newProjectError) {
      console.warn(newProjectError);
    }
    if (newProjectLoading) {
      console.warn(newProjectLoading);
    }
    console.warn(newProjectData);
  };

  const handleSave = () => {
    // TODO mutation to update Project in database
  };

  const handleShare = () => {
    // TODO create hashed link userID and projectID
  };

  const handleDownload = () => {
    // TODO download zip with project structure
  };

  return (
    <div className="flex flex-row h-full">
      {createModal && (
        <Modal show onClose={() => setCreateModal(false)}>
          <Modal.Header>About your project</Modal.Header>
          <Modal.Body>
            <Label htmlFor="projectName" value="Name of the project" />
            <TextInput
              id="projectName"
              type="text"
              placeholder="iLoveJS"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProjectName(e.target.value)
              }
              required
            />
            <Label htmlFor="projectDescription" value="Description" />
            <TextInput
              id="projectDescription"
              type="text"
              placeholder="Algorithm to be richer than Elon"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProjectDescription(e.target.value)
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
                    onChange={() => setNewProjectIsPublic(!newProjectIsPublic)}
                    id="status-public"
                  />
                </Label>
              </div>
            </div>
            <div className="grid place-items-center">
              <Button onClick={handleNewProject}>Create</Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {chooseModal && (
        <Modal show onClose={() => setChooseModal(false)}>
          <Modal.Header>Choose an existing project</Modal.Header>
          <Modal.Body>
            <ListGroup>
              {existingProjects.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  onClick={() => handleExistingProject(item.id)}
                >
                  {item.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
        </Modal>
      )}
      {currentProject && (
        <EditorAside
          setCurrentFileContent={setCurrentFileContent}
          projectData={currentProject}
        />
      )}
      <div className="px-8 py-8 h-full w-full flex flex-col">
        <div className="flex justify-between py-4">
          {/* TODO add dynamic path */}
          <p>
            {currentProject?.getOneProject.name
              ? currentProject?.getOneProject.name
              : "Project"}
            &gt; index.js
          </p>
          <Button onClick={handleEditorValidate} gradientDuoTone="cyanToBlue">
            Run
          </Button>
          <div className="flex gap-4">
            {/* TODO add actions */}
            <img src={saveFile} alt="save file" />
            <img src={downloadFile} alt="download file" />
            <img src={shareFile} alt="share file" />
          </div>
        </div>
        <div className="flex flex-row gap-8 h-full w-full">
          <div className="h-full w-full relative">
            <InputEditor
              editorValue={currentFileContent || editorValue}
              setEditorValue={setEditorValue}
            />
            <button
              type="button"
              style={{
                top: 0,
                right: 0,
                zIndex: 2,
              }}
              className="px-2 py-2 bg-[#20252D] absolute"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src={isOpen ? arrowRight : arrowLeft}
                alt="arrow pointing in closing direction"
              />
            </button>
          </div>
          {isOpen && (
            <div className="h-full w-full">
              <ReturnEditor codeToQuery={codeToRun} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorContainer;
