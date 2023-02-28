import { render, screen } from "@testing-library/react";

import EditorAside from "./EditorAside";

describe("EditorAside component", () => {
  it("Shows relevant elements by default", () => {
    render(<EditorAside projectName="Project" />);

    expect(screen.getByText("Project")).toBeDefined();
  });
});
