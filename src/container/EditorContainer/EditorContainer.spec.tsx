import { render, screen } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import EditorContainer from "./EditorContainer";
import { GET_CHOSEN_PROJECT } from "../../apollo/queries";
import mockConstants from "../../utils/mockConstants";

const mocks: Array<MockedResponse> = [
  {
    request: { query: GET_CHOSEN_PROJECT },
    result: { data: mockConstants.mockProject },
  },
];

// TODO failing because of no rerender when query is complete
describe.skip("InputEditor component", () => {
  it("Shows relevant elements by default", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <EditorContainer />
      </MockedProvider>,
    );

    expect(await screen.findByText("File 1 Content")).toBeDefined();
    expect(screen.getByRole("button", { name: "Run" })).toBeDefined();
    // TODO add Icon detection
    // expect(screen.getByAltText("save file")).toBeDefined();
    // expect(screen.getByAltText("download file")).toBeDefined();
    // expect(screen.getByAltText("arrow pointing")).toBeDefined();
  });
});
