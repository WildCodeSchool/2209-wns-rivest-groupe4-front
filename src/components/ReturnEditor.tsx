import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";

interface Props {
  codeToQuery: string;
}

const POST_CODE = gql`
  query postCode($code: String!) {
    postCode(code: $code)
  }
`;

function ReturnEditor({ codeToQuery }: Props) {
  const [returnedValue, setReturnedValue] = useState<string>("");

  const { loading, error, data } = useQuery(POST_CODE, {
    variables: { code: codeToQuery },
  });

  useEffect(() => {
    if (error) {
      setReturnedValue(error.message);
    }
    if (loading) {
      setReturnedValue("Loading...");
    }
    if (data) {
      setReturnedValue(data.postCode);
    }
  }, [returnedValue, data, error, loading]);

  return (
    <AceEditor
      value={returnedValue}
      mode="javascript"
      theme="twilight"
      // TODO create function to handle behaviour
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
