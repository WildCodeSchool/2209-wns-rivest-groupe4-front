import { render } from "@testing-library/react";

import EditorContainer from './EditorContainer';

describe("InputEditor component", () => {
  it("Shows relevant elements by default", () => {
    const { getByText, getByAltText, getByRole } = render(<EditorContainer />)

    expect(getByText("Codeless 4 Editor")).toBeDefined();
    expect(getByRole('button', { name: 'Run' })).toBeDefined()
    expect(getByAltText('save file')).toBeDefined()
    expect(getByAltText('download file')).toBeDefined()
    expect(getByAltText('arrow pointing in opening direction')).toBeDefined()
  });
});
