export const replaceIdWithValue = (pathname: string) => {
  const idPattern = /\/([0-9a-fA-F]{24})$/;

  if (idPattern.test(pathname)) {
    return pathname.replace(idPattern, '/:id');
  }

  return pathname;
}
