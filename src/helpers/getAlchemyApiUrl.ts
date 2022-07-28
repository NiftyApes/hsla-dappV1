export const getAlchemyUpiUrl = (path: string, network: string = 'testnet') => {
  const alchemyApiKey = process.env.REACT_APP_ALCHEMY_ID;
  if (!alchemyApiKey) {
    console.warn('Env REACT_APP_ALCHEMY_ID is not set');
  }

  const url = `https://eth-rinkeby.g.alchemy.com/nft/v2/${alchemyApiKey}`;

  return `${url}/${path}`;
};
