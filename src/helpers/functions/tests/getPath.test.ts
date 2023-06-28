import { createSearchParams } from "react-router-dom";
import { getPath } from "../";

describe("getPath", () => {
  it("should return simple path with id", () => {
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

  it("should return path with id and query param", () => {
    // given
    const queryString = "mockQuery";
    const data = {
      url: "path/:id/:query",
      params: {
        id: "1",
        query: `?${createSearchParams({ queryString }).toString()}`,
      },
    };

    // when
    const path = getPath(data);

    // then
    expect(path).toBe("path/1/?queryString=mockQuery");
  });
});
