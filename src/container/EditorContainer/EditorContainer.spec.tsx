import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import EditorContainer from "./EditorContainer";

const MOCK_PROJECTS = [
  {
    id: 1,
    name: "Project 1",
  },
  {
    id: 2,
    name: "Project 2",
  },
];

describe("InputEditor component", () => {
  it("Shows relevant elements by default", () => {
    render(
      <MockedProvider>
        <EditorContainer action={null} existingProjects={MOCK_PROJECTS} />
      </MockedProvider>,
    );

    expect(screen.getByText("Codeless 4 Editor")).toBeDefined();
    expect(screen.getByRole("button", { name: "Run" })).toBeDefined();
    expect(screen.getByAltText("save file")).toBeDefined();
    expect(screen.getByAltText("download file")).toBeDefined();
    expect(screen.getByAltText("arrow pointing")).toBeDefined();
  });
});
