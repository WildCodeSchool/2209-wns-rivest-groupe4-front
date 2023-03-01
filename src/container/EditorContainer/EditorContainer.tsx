import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import arrowLeft from "../../../public/assets/arrowLeft.svg";
import arrowRight from "../../../public/assets/arrowRight.svg";
import downloadFile from "../../../public/assets/downloadFile.svg";
import saveFileImg from "../../../public/assets/saveFile.svg";
import shareFile from "../../../public/assets/shareFile.svg";
import EditorAside from "../../components/EditorAside/EditorAside";
import InputEditor from "../../components/InputEditor/InputEditor";
import ReturnEditor from "../../components/ReturnEditor";
import IFile from "../../interfaces/IFile";
import { ExistingProjectQueryResult } from "./types";

export const GET_CHOSEN_PROJECT = gql`
  query GetOneProject($id: Float!) {
    getOneProject(id: $id) {
      id
      description
      createdAt
      name
      isPublic
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

function EditorContainer() {
  const [userID, setUserID] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { idProject } = useParams();

  // State that defines the editors current value and the code to be sent as mutation input
  const [currentFile, setCurrentFile] = useState<IFile>();
  const [currentProject, setCurrentProject] =
    useState<ExistingProjectQueryResult | null>(null);
  const [codeToRun, setCodeToRun] = useState<string>("");

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

  const { loading } = useQuery(GET_CHOSEN_PROJECT, {
    variables: { id: Number(idProject) },
    onCompleted: (data) => {
      setCurrentProject(data);
    },
  });

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
    if (localStorage.getItem("uuid")) {
      setUserID(localStorage.getItem("uuid"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-row h-full">
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
              <img src={isOpen ? arrowRight : arrowLeft} alt="arrow pointing" />
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
