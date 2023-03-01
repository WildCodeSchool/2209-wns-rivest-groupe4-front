import { render, screen } from "@testing-library/react";
import { ExistingProjectQueryResult } from "../../container/EditorContainer/types";

import EditorAside from "./EditorAside";

const MOCK_PROJECT: ExistingProjectQueryResult = {
  getOneProject: {
    id: "1",
    name: "Project 1",
    description: "Project 1 description",
    public: true,
  },
  getAllFoldersByProjectId: [
    {
      id: "1",
      name: "Folder 1",
      parentFolder: {
        id: "1",
        name: "Parent Folder 1",
      },
      children: [
        {
          id: "2",
          name: "Folder 2",
          parentFolder: {
            id: "1",
            name: "Parent Folder 1",
          },
        },
      ],
      files: [
        {
          content: "File 1 content",
          extension: "js",
          name: "File 1",
        },
      ],
    },
  ],
};

describe("EditorAside component", () => {
  it("Shows relevant elements by default", () => {
    render(
      <EditorAside projectData={MOCK_PROJECT} setCurrentFile={() => {}} />,
    );

    expect(screen.getByTestId("editor-aside")).toBeDefined();
  });
});
