import React from "react";
import { render } from "@testing-library/react";

import ChooseContainer from "./ChooseContainer";

describe("ChooseContainer component", () => {
  it("Shows relevant information", () => {
    render(<ChooseContainer />);
  });
});
