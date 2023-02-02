import React from "react";
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
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    // TODO use userId
    variables: { userId: "930a55eb-73ec-4a96-8f83-5dd8552831e8" },
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
