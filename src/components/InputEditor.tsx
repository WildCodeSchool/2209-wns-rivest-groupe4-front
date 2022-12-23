import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/keybinding-vscode";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-emmet";

interface Props {
  editorValue: string;
  setEditorValue: (e: string) => void;
}

function InputEditor({ editorValue, setEditorValue }: Props) {
  return (
    <AceEditor
      value={editorValue}
      mode="javascript"
      theme="twilight"
      // TODO create function to handle behaviour
      onChange={(e: string) => setEditorValue(e)}
      onBlur={() => {}}
      name="code_editor"
      placeholder="Codeless 4 Editor"
      editorProps={{ $blockScrolling: true }}
      enableBasicAutocompletion
      showGutter
      keyboardHandler="vscode"
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        highlightActiveLine: true,
        cursorStyle: "smooth",
        enableEmmet: true,
        showPrintMargin: false,
        showLineNumbers: true,
      }}
      style={{
        borderWidth: 1,
        borderColor: "black",
        height: "100%",
        width: "100%",
        position: "relative",
        zIndex: 1,
      }}
    />
  );
}

export default InputEditor;
