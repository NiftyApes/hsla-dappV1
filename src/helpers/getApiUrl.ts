export function getApiUrl(chainId: string, path: string) {
  const chainName =
    chainId === '0x7a69'
      ? 'DEV'
      : chainId === '0x5'
      ? 'GOERLI'
      : chainId === '0x1'
      ? 'MAINNET'
      : chainId === '0x64'
      ? 'GNOSIS'
      : '';

  const apiBaseUri =
    process.env.API_BASE_URI ||
    `https://qqxeqsrt39.execute-api.us-west-2.amazonaws.com/${chainName}/`;

  return `${apiBaseUri}v2/${path}`;
}
