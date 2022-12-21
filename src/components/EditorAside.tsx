import React from "react";

function EditorAside() {
  return (
    <aside
      className="w-[10%] bg-[#20252D]"
      style={{
        borderRightWidth: 1,
        borderColor: "white",
      }}
    >
      {/* TODO add dynamic project name */}
      <p>Project</p>
    </aside>
  );
}

export default EditorAside;
