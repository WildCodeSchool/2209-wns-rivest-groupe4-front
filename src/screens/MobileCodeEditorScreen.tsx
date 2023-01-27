import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/keybinding-vscode";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-emmet";

const MobileCodeEditorScreen = () => {
  return (
    <div className='absolute top-0' style={{ width: '100vw', height: '100vh'}}>
      <AceEditor
        readOnly
        value={undefined}
        mode="javascript"
        theme="twilight"
        name="code_editor"
        placeholder="Codeless 4 Editor"
        editorProps={{ $blockScrolling: true }}
        showGutter
        keyboardHandler="vscode"
        setOptions={{
          highlightActiveLine: true,
          cursorStyle: "smooth",
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
    </div>
  )
}

export default MobileCodeEditorScreen