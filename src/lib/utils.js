export const buildUrlWithParams = (baseUrl, queryParams) => {
  const params = new URLSearchParams();

  if (queryParams) {
    for (const key in queryParams) {
      const value = queryParams[key];
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    }
  }

  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
};
