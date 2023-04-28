import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import { Breadcrumb, Button, Spinner } from "flowbite-react";
import { useState } from "react";

import { useParams } from "react-router-dom";
import {
  ArrowDownOnSquareIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import EditorAside from "../../components/EditorAside/EditorAside";
import InputEditor from "../../components/InputEditor/InputEditor";
import ReturnEditor from "../../components/ReturnEditor";
import IFile from "../../interfaces/IFile";
import { ExistingProjectQueryResult } from "./types";
import { SAVE_PROJECT } from "../../apollo/mutations";
import { GET_CHOSEN_PROJECT } from "../../apollo/queries";

function EditorContainer() {
  document.title = "Codeless4 | Editor";

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

  const { loading, networkStatus, refetch } = useQuery(GET_CHOSEN_PROJECT, {
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

  if (loading || networkStatus === NetworkStatus.refetch) return <Spinner />;

  return (
    <div className="flex flex-row h-full">
      {currentProject && (
        <EditorAside
          setCurrentFile={setCurrentFile}
          projectData={currentProject}
          refetch={refetch}
        />
      )}
      <div className="h-full w-full flex flex-col">
        <div className="flex items-center justify-between bg-[#1b1b1b] px-4">
          <Breadcrumb aria-label="file-breadcrumb" className="py-3">
            <Breadcrumb.Item>
              {currentProject?.getOneProject.name
                ? currentProject?.getOneProject.name
                : "Project"}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {currentFile
                ? `${currentFile.name}.${currentFile.extension}`
                : ""}
            </Breadcrumb.Item>
          </Breadcrumb>
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
              <BookmarkIcon className="h-6 w-6" />
            </button>
            <button type="button" onClick={() => handleSave()}>
              <ArrowDownOnSquareIcon className="h-6 w-6" />
            </button>
            <button type="button" onClick={() => handleSave()}>
              <ShareIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-row h-full w-full">
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
                top: 1,
                right: 1,
                zIndex: 2,
              }}
              className="px-2 py-2 bg-[#1b1b1b] absolute"
              onClick={() => handleRun()}
            >
              {isOpen ? (
                <ArrowRightIcon className="h-6 w-6" />
              ) : (
                <ArrowLeftIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          {isOpen && (
            <div className="h-full w-full">
              <ReturnEditor
                codeToQuery={codeToRun}
                fileExtension={currentFile?.extension}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorContainer;
