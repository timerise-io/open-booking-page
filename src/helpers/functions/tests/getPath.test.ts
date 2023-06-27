import { getPath } from "../getPath";

describe("getPath", () => {
  it("should return the path of the file", () => {
    // given
    const data = {
      url: "path/:id",
      params: { id: "1" },
    };

    // when
    const path = getPath(data);

    // then
    expect(path).toBe("path/1");
  });
});
