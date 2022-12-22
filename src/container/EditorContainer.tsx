import { Button } from "flowbite-react";
import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import EditorAside from "../components/EditorAside";
import arrowLeft from "../../public/assets/arrowLeft.svg";
import arrowRight from "../../public/assets/arrowRight.svg";
import downloadFile from "../../public/assets/downloadFile.svg";
import saveFile from "../../public/assets/saveFile.svg";
import shareFile from "../../public/assets/shareFile.svg";

function EditorContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenSecondEditor = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-row h-full">
      <EditorAside />
      <div className="px-8 py-8 h-full w-full flex flex-col">
        <div className="flex justify-between py-4">
          {/* TODO add dynamic path */}
          <p>Project &gt; index.js</p>
          <Button onClick={handleOpenSecondEditor} gradientDuoTone="cyanToBlue">
            Run
          </Button>
          <div className="flex gap-4">
            {/* TODO add actions */}
            <img src={saveFile} alt="save file" />
            <img src={downloadFile} alt="download file" />
            <img src={shareFile} alt="share file" />
          </div>
        </div>
        <div className="flex flex-row gap-8 h-full w-full">
          <div className="h-full w-full relative">
            <AceEditor
              mode="javascript"
              theme="twilight"
              // TODO create function to handle behaviour
              onChange={() => {}}
              onCopy={() => {}}
              onPaste={() => {}}
              onBlur={() => {}}
              onValidate={() => {}}
              name="code_editor"
              placeholder="Codeless 4 Editor"
              editorProps={{ $blockScrolling: true }}
              enableBasicAutocompletion
              showGutter
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
            <button
              type="button"
              style={{
                top: 0,
                right: 0,
                zIndex: 2,
              }}
              className="px-2 py-2 bg-[#20252D] absolute"
              onClick={handleOpenSecondEditor}
            >
              <img
                src={isOpen ? arrowRight : arrowLeft}
                alt="arrow pointing in closing direction"
              />
            </button>
          </div>
          {isOpen && (
            <div className="h-full w-full">
              <AceEditor
                mode="javascript"
                theme="twilight"
                // TODO create function to handle behaviour
                onChange={() => {}}
                onCopy={() => {}}
                onPaste={() => {}}
                onBlur={() => {}}
                onValidate={() => {}}
                name="code_result"
                placeholder="Result"
                editorProps={{ $blockScrolling: true }}
                enableBasicAutocompletion
                showGutter
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  highlightActiveLine: true,
                  cursorStyle: "smooth",
                  enableEmmet: true,
                  showPrintMargin: false,
                  showLineNumbers: false,
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
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorContainer;
