import { render, screen } from "@testing-library/react";

import InputEditor from "./InputEditor";

describe("InputEditor component", () => {
  it("Shows placeholder by default", () => {
    render(<InputEditor editorValue="" setEditorValue={() => {}} />);

    expect(screen.getByText("Codeless 4 Editor")).toBeDefined();
  });
});
