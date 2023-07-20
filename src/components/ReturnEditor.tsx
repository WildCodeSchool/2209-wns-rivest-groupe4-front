import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import fileHooks from "../hooks/fileHooks";

interface Props {
  codeToQuery: string;
  fileExtension: string;
}

export const encodeBase64 = (data: string) => {
  return Buffer.from(data).toString("base64");
};

function ReturnEditor({ codeToQuery, fileExtension }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [returnedValue, setReturnedValue] = useState<string>("");

  useEffect(() => {
    axios({
      method: "post",
      url:
        process.env.NODE_ENV === "production"
          ? "/compiler/file"
          : "http://localhost:7008/compiler/file",
      data: {
        code: btoa(codeToQuery).toString(),
        fileExtension,
      },
    })
      .then((response) => {
        if (response.data) {
          setReturnedValue(JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        setReturnedValue(fileHooks.formatFileError(error.response.data));
      })
      .finally(() => setIsLoading(false));
  }, [codeToQuery, fileExtension]);

  return (
    <AceEditor
      value={isLoading ? "Loading..." : returnedValue}
      mode="javascript"
      theme="twilight"
      name="code_result"
      showGutter
      readOnly
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

export default ReturnEditor;
