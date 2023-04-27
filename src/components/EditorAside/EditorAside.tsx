/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  CreateFileMutationVariables,
  CreateFolderMutationVariables,
  ExistingProjectQueryResult,
  RenameFileMutationVariables,
  RenameFolderMutationVariables,
} from "../../container/EditorContainer/types";
import IFile from "../../interfaces/IFile";
import IFolderTree from "../../interfaces/IFolderTree";
import {
  ADD_FILE,
  ADD_FOLDER,
  DELETE_FILE,
  DELETE_FOLDER,
  RENAME_FILE,
  RENAME_FOLDER,
} from "../../apollo/mutations";
import CustomTooltip from "./Tooltip/CustomTooltip";
import AddFolderModal from "./Modals/AddFolderModal";
import AddFileModal from "./Modals/AddFileModal";
import DeleteModal from "./Modals/DeleteModal";
import RenameModal from "./Modals/RenameModal";

interface Props {
  projectData: ExistingProjectQueryResult;
  setCurrentFile: (file: IFile) => void;
  refetch: () => void;
}

interface MenuVisibility {
  file?: string;
  folder?: string;
}

const createTree = (folders: IFolderTree[]) => {
  const map = new Map<string, IFolderTree>();
  folders.forEach((folder) => {
    map.set(folder.id, { ...folder, children: [] });
  });
  const tree: IFolderTree[] = [];
  map.forEach((folder) => {
    const parent =
      folder && folder.parentFolder ? map.get(folder.parentFolder.id) : null;
    if (parent) {
      parent.children = [...(parent.children || []), folder];
    } else {
      tree.push(folder);
    }
  });
  return tree;
};

function FolderTree({
  tree,
  setCurrentFile,
  refetch,
}: {
  tree: IFolderTree[];
  setCurrentFile: (file: IFile) => void;
  refetch: () => void;
}) {
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<string>("");
  const [menuVisibility, setMenuVisibility] = useState<MenuVisibility>({});
  const [newFolderName, setNewFolderName] = useState<string>("");
  const [newFileName, setNewFileName] = useState<string>("");

  // MODALS
  const [showAddFolderModal, setShowAddFolderModal] = useState<{
    parentFolder: string;
  } | null>(null);
  const [showAddFileModal, setShowAddFileModal] = useState<{
    parentFolder: string;
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<{
    type: string;
    id: string;
  } | null>(null);
  const [showRenameModal, setShowRenameModal] = useState<{
    type: string;
    id: string;
  } | null>(null);

  // MUTATIIONS
  const [addFolder] = useMutation(ADD_FOLDER);

  const [addFile] = useMutation(ADD_FILE);

  const [deleteFolder] = useMutation(DELETE_FOLDER);

  const [deleteFile] = useMutation(DELETE_FILE);

  const [renameFolder] = useMutation(RENAME_FOLDER);

  const [renameFile] = useMutation(RENAME_FILE);

  const toggleFolder = (id: string) => {
    if (openFolders.includes(id)) {
      setOpenFolders(openFolders.filter((folderId) => folderId !== id));
    } else {
      setOpenFolders([...openFolders, id]);
    }
  };

  const handleFolderHover = (folderId: string) => {
    setMenuVisibility({ folder: folderId });
  };

  const handleFileHover = (fileId: string) => {
    setMenuVisibility({ file: fileId });
  };

  const handleCreateFolder = ({
    folderId,
    name,
  }: CreateFolderMutationVariables) => {
    addFolder({
      variables: {
        parentFolderId: parseInt(folderId, 10),
        name,
      },
      onCompleted() {
        setNewFolderName("");
        setShowAddFolderModal(null);
        refetch();
      },
      // optimisticResponse: {
      //   __typename: "Mutation",
      //   addFolder: {
      //     __typename: "Folder",
      //     id: -1,
      //     name,
      //     parentFolder: {
      //       __typename: "Folder",
      //       id: parseInt(folderId, 10),
      //     },
      //   },
      // },
    });
  };

  const handleCreateFile = ({
    folderId,
    name,
  }: CreateFileMutationVariables) => {
    const fileName = name.split(".")[0];
    const extension = name.split(".")[1];
    addFile({
      variables: {
        parentFolderId: parseInt(folderId, 10),
        extension,
        name: fileName,
      },
      onCompleted() {
        setNewFileName("");
        setShowAddFileModal(null);
        refetch();
      },
    });
  };

  const handleDeleteFolder = (folderId: number) => {
    deleteFolder({
      variables: {
        folderId,
      },
      onCompleted() {
        setShowDeleteModal(null);
        refetch();
      },
    });
  };

  const handleDeleteFile = (fileId: number) => {
    deleteFile({
      variables: {
        fileId,
      },
      onCompleted() {
        setShowDeleteModal(null);
        refetch();
      },
    });
  };

  const handleRenameFolder = ({
    folderId,
    name,
  }: RenameFolderMutationVariables) => {
    renameFolder({
      variables: {
        folderId,
        name,
      },
      onCompleted() {
        refetch();
      },
    });
  };

  const handleRenameFile = ({ fileId, name }: RenameFileMutationVariables) => {
    renameFile({
      variables: {
        idFile: fileId,
        name,
      },
      onCompleted() {
        refetch();
      },
    });
  };

  const handleCollapsable = (folderId: string) => {
    if (isCollapsed === folderId) {
      setIsCollapsed("");
    } else {
      setIsCollapsed(folderId);
    }
  };

  return (
    <>
      {tree.map((folder) => (
        <div className="ml-4 cursor-pointer" key={folder.id}>
          <div
            className={`${
              menuVisibility.folder === folder.id && "bg-sky-500/[.06]"
            } flex justify-between`}
            onMouseEnter={() => {
              handleFolderHover(folder.id);
            }}
            onMouseLeave={() => handleFolderHover("")}
          >
            <div
              className="relative"
              onClick={() => {
                toggleFolder(folder.id);
                handleCollapsable(folder.id);
              }}
            >
              {folder.name}
              {isCollapsed === folder.id ? (
                <span
                  className="absolute rotate-90 p-1"
                  style={{ fontWeight: "200" }}
                >
                  &gt;
                </span>
              ) : (
                <span className="p-1" style={{ fontWeight: "200" }}>
                  &gt;
                </span>
              )}
            </div>
            {menuVisibility.folder === folder.id && (
              <CustomTooltip
                type="folder"
                setShowAddFolderModal={() =>
                  setShowAddFolderModal({ parentFolder: folder.id })
                }
                setShowAddFileModal={() =>
                  setShowAddFileModal({ parentFolder: folder.id })
                }
                setShowDeleteModal={() =>
                  setShowDeleteModal({ type: "folder", id: folder.id })
                }
                setShowRenameModal={() =>
                  setShowRenameModal({ type: "folder", id: folder.id })
                }
              />
            )}
          </div>
          {folder.children &&
            isCollapsed === folder.id &&
            (openFolders.includes(folder.id) ? (
              <FolderTree
                setCurrentFile={setCurrentFile}
                tree={folder.children}
                refetch={refetch}
              />
            ) : null)}
          {folder.files &&
            isCollapsed === folder.id &&
            folder.files.map((file: IFile) => {
              return (
                <div
                  key={file.id}
                  className={`${
                    menuVisibility.file === file.id && "bg-sky-500/[.06]"
                  } flex justify-between ml-4`}
                  onClick={() => setCurrentFile(file)}
                  onMouseEnter={() => {
                    if (file.id) {
                      handleFileHover(file.id.toString());
                    }
                  }}
                  onMouseLeave={() => handleFileHover("")}
                >
                  <div key={file.name}>
                    {file.name}.{file.extension}
                  </div>
                  {menuVisibility.file === file.id && file.id && (
                    <CustomTooltip
                      type="file"
                      setShowAddFolderModal={() =>
                        setShowAddFolderModal({ parentFolder: folder.id })
                      }
                      setShowAddFileModal={() =>
                        setShowAddFileModal({ parentFolder: folder.id })
                      }
                      setShowDeleteModal={() => {
                        if (file.id) {
                          setShowDeleteModal({
                            type: "file",
                            id: file.id?.toString(),
                          });
                        }
                      }}
                      setShowRenameModal={() => {
                        if (file.id) {
                          setShowRenameModal({
                            type: "file",
                            id: file.id.toString(),
                          });
                        }
                      }}
                    />
                  )}
                </div>
              );
            })}
        </div>
      ))}
      <AddFolderModal
        showAddFolderModal={showAddFolderModal}
        setShowAddFolderModal={setShowAddFolderModal}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
        onSubmit={handleCreateFolder}
      />
      <AddFileModal
        showAddFileModal={showAddFileModal}
        setShowAddFileModal={setShowAddFileModal}
        newFileName={newFileName}
        setNewFileName={setNewFileName}
        onSubmit={handleCreateFile}
      />
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteFolder={handleDeleteFolder}
        deleteFile={handleDeleteFile}
      />
      <RenameModal
        showRenameModal={showRenameModal}
        setShowRenameModal={setShowRenameModal}
        renameFolder={handleRenameFolder}
        renameFile={handleRenameFile}
      />
    </>
  );
}

function EditorAside({ projectData, setCurrentFile, refetch }: Props) {
  return (
    <aside
      className="w-[15%] bg-[#20252D] py-2"
      data-testid="editor-aside"
      style={{
        borderRightWidth: 2,
        borderColor: "white",
      }}
    >
      <FolderTree
        setCurrentFile={setCurrentFile}
        tree={createTree(projectData.getAllFoldersByProjectId)}
        refetch={refetch}
      />
    </aside>
  );
}

export default EditorAside;
