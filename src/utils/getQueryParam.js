export const getQueryParam = (name, location) => {
  if (!location?.search) {
    return null;
  }
  const params = new URLSearchParams(location.search);
  return params.get(name);
};
