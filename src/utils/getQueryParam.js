export const getQueryParam = (name, location) => {
  const params = new URLSearchParams(location.search);
  return params.get(name);
};
