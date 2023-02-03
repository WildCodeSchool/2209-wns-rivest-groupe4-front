import {
  Button,
  Checkbox,
  Label,
  ListGroup,
  Modal,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

import EditorAside from "../../components/EditorAside/EditorAside";
import arrowLeft from "../../../public/assets/arrowLeft.svg";
import arrowRight from "../../../public/assets/arrowRight.svg";
import downloadFile from "../../../public/assets/downloadFile.svg";
import saveFileImg from "../../../public/assets/saveFile.svg";
import shareFile from "../../../public/assets/shareFile.svg";
import ReturnEditor from "../../components/ReturnEditor";
import InputEditor from "../../components/InputEditor/InputEditor";
import {
  CreateNewProjectMutationResult,
  CreateNewProjectMutationVariables,
  ExistingProjectQueryResult,
  ExistingProjectQueryVariables,
} from "./types";
import IFile from "../../interfaces/IFile";

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
        id
        content
        extension
        name
      }
    }
  }
`;

const SAVE_PROJECT = gql`
  mutation ModifyFile(
    $idFile: Float!
    $fileName: String
    $fileContent: String
    $fileExtension: String
  ) {
    modifyFile(
      idFile: $idFile
      name: $fileName
      content: $fileContent
      extension: $fileExtension
    )
  }
`;

interface Props {
  action: string | null;
  existingProjects: { id: number; name: string }[];
}

function EditorContainer({ action, existingProjects }: Props) {
  const [userID, setUserID] = useState<string | null>(null);
  // State to determine which modal to show
  const [createModal, setCreateModal] = useState<boolean>(action === "new");
  const [chooseModal, setChooseModal] = useState<boolean>(
    action === "existing",
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // State that defines the editors current value and the code to be sent as mutation input
  const [currentFile, setCurrentFile] = useState<IFile>();
  const [currentProject, setCurrentProject] =
    useState<ExistingProjectQueryResult | null>(null);
  const [codeToRun, setCodeToRun] = useState<string>("");

  // State for new project inputs
  const [newProjectDescription, setNewProjectDescription] =
    useState<string>("");
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [newProjectIsPublic, setNewProjectIsPublic] = useState<boolean>(false);

  const handleEditorValidate = () => {
    if (currentFile) {
      setCodeToRun(currentFile?.content);
    }
    setIsOpen(true);
  };

  const [saveFile] = useMutation(SAVE_PROJECT, {
    variables: {
      idFile: Number(currentFile?.id),
      fileName: currentFile?.name,
      fileExtension: currentFile?.extension,
      fileContent: currentFile?.content,
    },
  });

  const [loadProject] = useLazyQuery<
    ExistingProjectQueryResult,
    ExistingProjectQueryVariables
  >(GET_CHOSEN_PROJECT, {
    onCompleted: (data) => {
      setCurrentProject(data);
    },
  });

  const [createProject, { data: newProjectData }] = useMutation<
    CreateNewProjectMutationResult,
    CreateNewProjectMutationVariables
  >(CREATE_PROJECT, {
    variables: {
      // TODO regle a enlever une fois que l'accces a l'editeur sera reservee aux users login
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      userId: userID!,
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
    if (chooseModal === true) {
      setChooseModal(false);
    }
  };

  const handleNewProject = () => {
    createProject();
    if (newProjectData) {
      console.warn(newProjectData);
      setCreateModal(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSave = () => {
    if (currentFile) {
      saveFile();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleShare = () => {
    // TODO create hashed link userID and projectID
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDownload = () => {
    // TODO download zip with project structure
  };

  const handleRun = () => {
    setIsOpen(!isOpen);
    saveFile();
  };

  useEffect(() => {
    if (action !== "new" && action !== "existing") {
      handleExistingProject(Number(action));
    }
    if (localStorage.getItem("uuid")) {
      setUserID(localStorage.getItem("uuid"));
    }
    if (existingProjects.length < 1) {
      setChooseModal(false);
      setCreateModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

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
          setCurrentFile={setCurrentFile}
          projectData={currentProject}
        />
      )}
      <div className="px-8 py-8 h-full w-full flex flex-col">
        <div className="flex justify-between py-4">
          <p>
            {currentProject?.getOneProject.name
              ? currentProject?.getOneProject.name
              : "Project"}
            &nbsp; &gt;{" "}
            {currentFile ? `${currentFile.name}.${currentFile.extension}` : ""}
          </p>
          <Button
            onClick={() => {
              handleRun();
              handleEditorValidate();
            }}
            gradientDuoTone="cyanToBlue"
          >
            Run
          </Button>
          <div className="flex gap-4">
            {/* TODO add actions */}
            <button type="button" onClick={() => handleSave()}>
              <img src={saveFileImg} alt="save file" />
            </button>
            <img src={downloadFile} alt="download file" />
            <img src={shareFile} alt="share file" />
          </div>
        </div>
        <div className="flex flex-row gap-8 h-full w-full">
          <div className="h-full w-full relative">
            <InputEditor
              editorValue={currentFile ? currentFile.content : ""}
              setEditorValue={(e) => {
                if (currentFile) {
                  setCurrentFile({
                    id: currentFile.id,
                    name: currentFile.name,
                    extension: currentFile.extension,
                    content: e,
                  });
                }
              }}
            />
            <button
              type="button"
              style={{
                top: 0,
                right: 0,
                zIndex: 2,
              }}
              className="px-2 py-2 bg-[#20252D] absolute"
              onClick={() => handleRun()}
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
