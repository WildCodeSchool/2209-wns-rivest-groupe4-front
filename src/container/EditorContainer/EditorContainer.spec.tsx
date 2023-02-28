import { render, screen } from "@testing-library/react";

import EditorContainer from "./EditorContainer";

describe("InputEditor component", () => {
  it("Shows relevant elements by default", () => {
    render(<EditorContainer />);

    expect(screen.getByText("Codeless 4 Editor")).toBeDefined();
    expect(screen.getByRole("button", { name: "Run" })).toBeDefined();
    expect(screen.getByAltText("save file")).toBeDefined();
    expect(screen.getByAltText("download file")).toBeDefined();
    expect(
      screen.getByAltText("arrow pointing in opening direction"),
    ).toBeDefined();
  });
});
