import { generatePath } from "react-router-dom";

export const getPath = ({ url, params }: { url: string; params: any }): string => {
  return generatePath(url, params);
};
