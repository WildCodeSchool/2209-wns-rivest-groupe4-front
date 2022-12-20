import React from "react";
import AceEditor from "react-ace";

function EditorScreen() {
  return (
    <div>
      <AceEditor
        mode="javascript"
        theme="github"
        // TODO create function to handle behaviour
        onChange={() => {}}
        onCopy={() => {}}
        onPaste={() => {}}
        onBlur={() => {}}
        onValidate={() => {}}
        name="code_editor"
        placeholder="Codeless 4 Editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        className="main-editor"
        showGutter
        showPrintMargin
        style={{ borderWidth: 1, borderColor: "red" }}
      />
    </div>
  );
}

export default EditorScreen;
