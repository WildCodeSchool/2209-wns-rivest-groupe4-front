import { Button } from "flowbite-react";
import React, { useState } from "react";

import EditorAside from "../components/EditorAside";
import arrowLeft from "../../public/assets/arrowLeft.svg";
import arrowRight from "../../public/assets/arrowRight.svg";
import downloadFile from "../../public/assets/downloadFile.svg";
import saveFile from "../../public/assets/saveFile.svg";
import shareFile from "../../public/assets/shareFile.svg";
import ReturnEditor from "../components/ReturnEditor";
import InputEditor from "../components/InputEditor";

function EditorContainer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editorValue, setEditorValue] = useState<string>("");
  const [codeToRun, setCodeToRun] = useState<string>("");
  const handleEditorValidate = () => {
    setCodeToRun(editorValue);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-row h-full">
      <EditorAside />
      <div className="px-8 py-8 h-full w-full flex flex-col">
        <div className="flex justify-between py-4">
          {/* TODO add dynamic path */}
          <p>Project &gt; index.js</p>
          <Button onClick={handleEditorValidate} gradientDuoTone="cyanToBlue">
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
            <InputEditor
              editorValue={editorValue}
              setEditorValue={setEditorValue}
            />
            <button
              type="button"
              style={{
                top: 0,
                right: 0,
                zIndex: 2,
              }}
              className="px-2 py-2 bg-[#20252D] absolute"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src={isOpen ? arrowRight : arrowLeft}
                alt="arrow pointing in closing direction"
              />
            </button>
          </div>
          {isOpen && (
            <div className="h-full w-full">
              <ReturnEditor codeToQuery={codeToRun} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorContainer;
