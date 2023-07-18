/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import { Breadcrumb, Button, Spinner } from "flowbite-react";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowDownOnSquareIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import AlertContext from "../../contexts/AlertContext";
import EditorAside from "../../components/EditorAside/EditorAside";
import InputEditor from "../../components/InputEditor/InputEditor";
import ReturnEditor from "../../components/ReturnEditor";
import IFile from "../../interfaces/IFile";
import { ExistingProjectQueryResult } from "./types";
import { SAVE_PROJECT, ADD_RUN } from "../../apollo/mutations";
import { GET_CHOSEN_PROJECT, GET_DAILY_RUNS } from "../../apollo/queries";
import fileHooks from "../../hooks/fileHooks";
import useEventListener from "../../hooks/useEventListener";
import useLoggedUser from "../../hooks/useLoggedUser";
import IFolder from "../../interfaces/IFolder";

function EditorContainer() {
  document.title = "Codeless4 | Editor";
  const { user } = useLoggedUser();
  const { showAlert } = useContext(AlertContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dailyRuns, setDailyRuns] = useState<number>(0);
  const { idProject } = useParams();

  // State that defines the editors current value and the code to be sent as mutation input
  const [currentFile, setCurrentFile] = useState<IFile>({
    id: "0",
    name: "",
    extension: "",
    content: "",
  });
  const [currentProject, setCurrentProject] =
    useState<ExistingProjectQueryResult | null>(null);
  const [codeToRun, setCodeToRun] = useState<string>("");
  const [ariane, setAriane] = useState<string[]>([]);

  const handleEditorValidate = () => {
    if (currentFile) {
      setCodeToRun(currentFile?.content);
    }
    setIsOpen(true);
  };

  const { refetch: refreshDailyRuns } = useQuery(GET_DAILY_RUNS, {
    onCompleted(data: { getDailyRunsUser: number }) {
      setDailyRuns(data.getDailyRunsUser);
    },
  });

  const [saveFile] = useMutation(SAVE_PROJECT, {
    variables: {
      idFile: Number(currentFile?.id),
      fileName: currentFile?.name,
      fileExtension: currentFile?.extension,
      fileContent: currentFile?.content,
    },
  });

  const [addRun] = useMutation(ADD_RUN);

  const { loading, networkStatus, refetch } = useQuery(GET_CHOSEN_PROJECT, {
    variables: { id: Number(idProject) },
    onCompleted: (data) => {
      setCurrentProject(data);
      setCurrentFile(
        data.getAllFoldersByProjectId.find(
          (el: IFolder) => el.parentFolder == null || el.files.length > 0,
        ).files[0],
      );
    },
  });

  useEffect(() => {
    if (currentProject !== null && currentFile) {
      setAriane(fileHooks.getAriane(currentProject, currentFile));
    }
  }, [currentFile, currentProject]);

  const handleSave = () => {
    if (currentFile) {
      saveFile();
    }
  };

  const handleKeyboardSave = (event: KeyboardEvent) => {
    const { key, ctrlKey } = event;
    if (ctrlKey && key === "s") {
      event.preventDefault();
      handleSave();
    }
  };

  useEventListener("keydown", handleKeyboardSave);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleShare = () => {
    // TODO create hashed link userID and projectID
  };

  const handleDownload = (project: ExistingProjectQueryResult) => {
    fileHooks.saveProjectAsZip(project);
  };

  const handleRun = async () => {
    if ((dailyRuns < 50 && !user.premium) || user.premium) {
      addRun();
      setDailyRuns(dailyRuns + 1);
      setIsOpen(!isOpen);
      saveFile();
      await refreshDailyRuns();
    } else {
      showAlert(
        "You have reached your daily limit of runs, please upgrade to premium to run more than 50 times a day.",
        "warning",
      );
    }
  };

  if (loading || networkStatus === NetworkStatus.refetch) return <Spinner />;
  return (
    <div className="flex flex-row h-screen">
      {currentProject && (
        <EditorAside
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          projectData={currentProject}
          refetch={refetch}
        />
      )}
      <div className="h-full w-full flex flex-col">
        <div className="flex items-center justify-between bg-[#1b1b1b] px-4">
          <Breadcrumb aria-label="file-breadcrumb" className="py-3 w-40">
            <Breadcrumb.Item className="min-w-fit">
              {currentProject?.getOneProject.name
                ? currentProject?.getOneProject.name
                : "Project"}
            </Breadcrumb.Item>
            {ariane.map((el, index) =>
              ariane.length > 3 ? (
                index < ariane.length - 2 ? (
                  <Breadcrumb.Item className="min-w-fit" key={el}>
                    ...
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item className="min-w-fit" key={el}>
                    {el}
                  </Breadcrumb.Item>
                )
              ) : (
                <Breadcrumb.Item className="min-w-fit" key={el}>
                  {el}
                </Breadcrumb.Item>
              ),
            )}
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
            {currentProject && (
              <button
                type="button"
                onClick={() => handleDownload(currentProject)}
              >
                <ArrowDownOnSquareIcon className="h-6 w-6" />
              </button>
            )}
            <button type="button" onClick={() => handleSave()}>
              <ShareIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-row h-full w-full">
          <div className="h-full w-full relative">
            <InputEditor
              editorValue={
                currentFile
                  ? currentFile.content
                  : fileHooks.findFirstFile(currentProject!)
              }
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
          {isOpen && currentFile && (
            <div className="h-full w-full">
              <ReturnEditor
                codeToQuery={fileHooks.getImportedFiles(
                  codeToRun,
                  currentProject!,
                )}
                fileExtension={currentFile.extension}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorContainer;
