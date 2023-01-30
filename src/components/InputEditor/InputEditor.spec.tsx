import { render } from "@testing-library/react";

import InputEditor from './InputEditor';

describe("InputEditor component", () => {
  it("Shows placeholder by default", () => {
    const { getByText } = render(<InputEditor editorValue='' setEditorValue={() => {}} />)

    expect(getByText("Codeless 4 Editor")).toBeDefined();
  });
});
