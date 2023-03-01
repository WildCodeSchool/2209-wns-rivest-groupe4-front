import { render, screen } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import EditorContainer, { GET_CHOSEN_PROJECT } from "./EditorContainer";

const mocks: Array<MockedResponse> = [
  { request: { query: GET_CHOSEN_PROJECT }, result: { data: {} } },
];

describe("InputEditor component", () => {
  it("Shows relevant elements by default", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <EditorContainer />
      </MockedProvider>,
    );

    expect(await screen.findByText("Codeless 4 Editor")).toBeDefined();
    expect(screen.getByRole("button", { name: "Run" })).toBeDefined();
    expect(screen.getByAltText("save file")).toBeDefined();
    expect(screen.getByAltText("download file")).toBeDefined();
    expect(screen.getByAltText("arrow pointing")).toBeDefined();
  });
});
