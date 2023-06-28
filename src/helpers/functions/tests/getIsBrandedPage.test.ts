import { PAGES } from "pages/constans";
import { matchPath } from "react-router-dom";
import { getIsBrandedPage } from "..";

// Replace with the actual file name

jest.mock("react-router-dom", () => ({
  matchPath: jest.fn(),
}));

describe("getIsBrandedPage", () => {
  beforeEach(() => {
    (matchPath as jest.Mock).mockClear();
  });

  it("should return true if path matches any of the branded pages", () => {
    const path = PAGES.SERVICE;
    const mockMatch = { path, isExact: true, params: {} };
    (matchPath as jest.Mock).mockReturnValueOnce(mockMatch);

    const result = getIsBrandedPage(path);

    expect(matchPath as jest.Mock).toHaveBeenCalledWith(PAGES.SERVICE, path);
    expect(matchPath as jest.Mock).toHaveBeenCalledWith(PAGES.SERVICES, path);
    expect(matchPath as jest.Mock).toHaveBeenCalledWith(PAGES.BOOKING, path);
    expect(matchPath as jest.Mock).toHaveBeenCalledWith(PAGES.RESCHEDULE, path);
    expect(result).toBe(true);
  });

  it("should return false if path does not match any of the branded pages", () => {
    const path = "/mock-path/";
    (matchPath as jest.Mock).mockReturnValueOnce(null);

    const result = getIsBrandedPage(path);

    expect(matchPath as jest.Mock).toHaveBeenCalledWith(PAGES.SERVICE, path);
    expect(matchPath as jest.Mock).toHaveBeenCalledWith(PAGES.SERVICES, path);
    expect(matchPath as jest.Mock).toHaveBeenCalledWith(PAGES.BOOKING, path);
    expect(matchPath as jest.Mock).toHaveBeenCalledWith(PAGES.RESCHEDULE, path);
    expect(result).toBe(false);
  });
});
