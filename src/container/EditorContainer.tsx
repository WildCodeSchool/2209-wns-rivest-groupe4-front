import { Button } from "flowbite-react";
import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-tomorrow_night_blue";

function EditorContainer() {
  return (
    <div className="editor-container">
      <AceEditor
        mode="javascript"
        theme="tomorrow_night_blue"
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
          highlightActiveLine: true,
        }}
        className="main-editor"
        showGutter
        showPrintMargin
        style={{ borderWidth: 1, borderColor: "black" }}
      />
      <div className="flex flex-wrap gap-2">
        <div>
          <Button gradientDuoTone="purpleToBlue">Run</Button>
        </div>
      </div>
      <Button>Hi</Button>
    </div>
  );
}

export default EditorContainer;
