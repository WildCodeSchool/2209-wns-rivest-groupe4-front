import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useQueryParams } from "../utils/utils";
import EditorContainer from "../container/EditorContainer/EditorContainer";

const GET_PROJECTS = gql`
  query GetProjectsByUserId($userId: String!) {
    getProjectsByUserId(userId: $userId) {
      name
      id
    }
  }
`;

function EditorScreen() {
  const query = useQueryParams();

  const [userID, setUserID] = useState<string | null>();

  useEffect(() => {
    if (localStorage.getItem("uuid")) {
      setUserID(localStorage.getItem("uuid"));
    }
  }, [userID]);

  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { userId: userID },
  });
  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <EditorContainer
      action={query.get("open")}
      existingProjects={data.getProjectsByUserId}
    />
  );
}

export default EditorScreen;
