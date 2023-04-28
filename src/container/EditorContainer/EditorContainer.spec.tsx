import { render, screen } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import EditorContainer from "./EditorContainer";
import { GET_CHOSEN_PROJECT } from "../../apollo/queries";

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
    // TODO add Icon detection
    // expect(screen.getByAltText("save file")).toBeDefined();
    // expect(screen.getByAltText("download file")).toBeDefined();
    // expect(screen.getByAltText("arrow pointing")).toBeDefined();
  });
});
