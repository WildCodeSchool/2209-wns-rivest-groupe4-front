import React from "react";
import { render, screen } from "@testing-library/react";

import InputEditor, { Props } from "./InputEditor";

describe("InputEditor component", () => {
  const setup = ({ editorValue, setEditorValue }: Props) =>
    render(
      <InputEditor editorValue={editorValue} setEditorValue={setEditorValue} />,
    );

  it("Has an empy value by default", () => {
    setup({ editorValue: "fe", setEditorValue: () => {} });

    expect(screen.getByTestId("inputEditor")).toHaveValue("");
  });
});
