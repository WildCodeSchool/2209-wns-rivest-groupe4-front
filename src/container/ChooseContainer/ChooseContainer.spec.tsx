import React from "react";
import ChooseContainer from './ChooseContainer';

describe("ChooseContainer component", () => {
  it("Shows relevant information", () => {
    const { getByText } = render(<ChooseContainer />)
  });
});
