import React from "react";

interface Props {
  projectName: string;
}

function EditorAside({ projectName }: Props) {
  return (
    <aside
      className="w-[10%] bg-[#20252D]"
      style={{
        borderRightWidth: 1,
        borderColor: "white",
      }}
    >
      {/* TODO add dynamic project name */}
      <p>{projectName || "Project"}</p>
    </aside>
  );
}

export default EditorAside;
