/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { ExistingProjectQueryResult } from "../../container/EditorContainer/types";
import IFile from "../../interfaces/IFile";
import IFolderTree from "../../interfaces/IFolderTree";

interface Props {
  projectData: ExistingProjectQueryResult;
  setCurrentFile: (file: IFile) => void;
}

function Folder({
  folder,
  depth,
  setCurrentFile,
}: {
  folder: IFolderTree;
  depth: number;
  setCurrentFile: (file: IFile) => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div style={{ marginLeft: depth * 20, cursor: "pointer" }}>
      <div onClick={() => setIsCollapsed(!isCollapsed)}>
        {folder.name} {!isCollapsed ? "-" : "+"}
      </div>
      {!isCollapsed &&
        folder.files.map((file) => (
          <div
            onClick={() => setCurrentFile(file)}
            key={`${file.content}-${file.name}-${file.extension}`}
            style={{ marginLeft: 20 }}
          >
            {`${file.name}.${file.extension}`}
          </div>
        ))}
    </div>
  );
}

function Tree({
  tree,
  setCurrentFile,
}: {
  tree: IFolderTree[];
  setCurrentFile: (file: IFile) => void;
}) {
  return (
    <div>
      {tree.map((folder, index) => (
        <Folder
          setCurrentFile={setCurrentFile}
          key={folder.name}
          folder={folder}
          depth={index}
        />
      ))}
    </div>
  );
}

const createTree = (
  folders: IFolderTree[],
  parentFolderId: string | null = null,
): IFolderTree[] => {
  return folders
    .filter((folder) => folder.parentFolder === parentFolderId)
    .map((folder) => {
      const children = createTree(folders, folder.id);
      return {
        name: folder.name,
        files: folder.files,
        children,
      };
    });
};

function EditorAside({ projectData, setCurrentFile }: Props) {
  return (
    <aside
      className="w-[10%] bg-[#20252D]"
      style={{
        borderRightWidth: 1,
        borderColor: "white",
      }}
    >
      <Tree
        setCurrentFile={setCurrentFile}
        tree={createTree(projectData.getAllFoldersByProjectId)}
      />
    </aside>
  );
}

export default EditorAside;
