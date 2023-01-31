import { render } from "@testing-library/react";

import EditorAside from './EditorAside';

describe("EditorAside component", () => {
  it("Shows relevant elements by default", () => {
    const { getByText } = render(<EditorAside projectName='Project' />)

    expect(getByText("Project")).toBeDefined();
  });
})