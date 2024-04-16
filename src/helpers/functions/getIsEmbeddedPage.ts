export const getIsEmbeddedPage = (path: string) => {
  const regex = /embedded/g;

  return path.match(regex);
};
