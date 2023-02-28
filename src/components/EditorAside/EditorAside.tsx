/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Tooltip } from "flowbite-react";
import React, { useState } from "react";
import { ExistingProjectQueryResult } from "../../container/EditorContainer/types";
import IFile from "../../interfaces/IFile";
import IFolderTree from "../../interfaces/IFolderTree";

interface Props {
  projectData: ExistingProjectQueryResult;
  setCurrentFile: (file: IFile) => void;
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
}: {
  tree: IFolderTree[];
  setCurrentFile: (file: IFile) => void;
}) {
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<string>("");
  const [menuVisibility, setMenuVisibility] = useState<string>("");

  const toggleFolder = (id: string) => {
    if (openFolders.includes(id)) {
      setOpenFolders(openFolders.filter((folderId) => folderId !== id));
    } else {
      setOpenFolders([...openFolders, id]);
    }
  };
  const handleFolderHover = (folderId: string) => {
    setMenuVisibility(folderId);
  };

  const handleCollapsable = (folderId: string) => {
    if (isCollapsed === folderId) {
      setIsCollapsed('')
    } else {
      setIsCollapsed(folderId);
    }
  };

  return (
    <>
      {tree.map((folder) => (
        <div className="ml-4 cursor-pointer" key={folder.id}>
          <div
            className={`${menuVisibility === folder.id && "bg-sky-500/[.06]"
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
            {menuVisibility === folder.id && (
              <div className="inline-block px-2">
                <Tooltip
                  arrow={false}
                  placement="right"
                  content={
                    <>
                      <button className="block" type="button">
                        Create folder
                      </button>
                      <button className="block" type="button">
                        Create file
                      </button>
                      <button className="block" type="button">
                        Delete
                      </button>
                      <button className="block" type="button">
                        Rename
                      </button>
                    </>
                  }
                  trigger="click"
                >
                  ...
                </Tooltip>
              </div>
            )}
          </div>
          {folder.children && isCollapsed === folder.id &&
            (openFolders.includes(folder.id) ? (
              <FolderTree
                setCurrentFile={setCurrentFile}
                tree={folder.children}
              />
            ) : null)}
          {folder.files &&
            folder.files.map((file) => (
              <div className='ml-4' onClick={() => setCurrentFile(file)} key={file.name}>
                {file.name}.{file.extension}
              </div>
            ))}
        </div>
      ))}
    </>
  );
}

function EditorAside({ projectData, setCurrentFile }: Props) {
  return (
    <aside
      className="w-[15%] bg-[#20252D] py-2"
      style={{
        borderRightWidth: 2,
        borderColor: "white",
      }}
    >
      <FolderTree
        setCurrentFile={setCurrentFile}
        tree={createTree(projectData.getAllFoldersByProjectId)}
      />
    </aside>
  );
}

export default EditorAside;
