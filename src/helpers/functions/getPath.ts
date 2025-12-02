import { generatePath } from "react-router-dom";

export const getPath = ({ url, params }: { url: string; params: Record<string, string | number> }): string => {
  return generatePath(url, params);
};
