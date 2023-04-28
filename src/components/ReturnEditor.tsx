import React, { useState } from "react";
import AceEditor from "react-ace";
import axios from "axios";

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

  axios({
    method: "post",
    url: "http://localhost:7008/compiler/file",
    data: {
      code: btoa(codeToQuery).toString(),
      fileExtension,
    },
  })
    .then((response) => {
      setReturnedValue(response.data);
    })
    .catch((error) => {
      setReturnedValue(error);
    })
    .finally(() => setIsLoading(false));

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
