import mockConstants from "../utils/mockConstants";
import fileHooks from "./fileHooks";

describe("findFirstFile", () => {
  it("returns the content of the file with the ID closest to 0", () => {
    const result = fileHooks.findFirstFile(mockConstants.mockProject);
    expect(result).toEqual("File 1 Content");
  });
});
