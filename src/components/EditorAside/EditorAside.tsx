/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import {
  ExistingProjectQueryResult,
  FolderTree,
} from "../../container/EditorContainer/types";

interface Props {
  projectData: ExistingProjectQueryResult;
  setCurrentFileContent: (content: string) => void;
}

function Folder({
  folder,
  depth,
  setCurrentFileContent,
}: {
  folder: FolderTree;
  depth: number;
  setCurrentFileContent: (content: string) => void;
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
            onClick={() => setCurrentFileContent(file.content)}
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
  setCurrentFileContent,
}: {
  tree: FolderTree[];
  setCurrentFileContent: (content: string) => void;
}) {
  return (
    <div>
      {tree.map((folder, index) => (
        <Folder
          setCurrentFileContent={setCurrentFileContent}
          key={folder.name}
          folder={folder}
          depth={index}
        />
      ))}
    </div>
  );
}

const createTree = (
  folders: Array<FolderTree>,
  parentFolderId: string | null = null,
): FolderTree[] => {
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

function EditorAside({ projectData, setCurrentFileContent }: Props) {
  return (
    <aside
      className="w-[10%] bg-[#20252D]"
      style={{
        borderRightWidth: 1,
        borderColor: "white",
      }}
    >
      <Tree
        setCurrentFileContent={setCurrentFileContent}
        tree={createTree(projectData.getAllFoldersByProjectId)}
      />
    </aside>
  );
}

export default EditorAside;
