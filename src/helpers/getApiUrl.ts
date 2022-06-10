export function getApiUrl(path = '') {
  const apiBaseUri =
    process.env.API_BASE_URI || 'https://qqxeqsrt39.execute-api.us-west-2.amazonaws.com/DEV/';

  return `${apiBaseUri}api/${path}`;
}
