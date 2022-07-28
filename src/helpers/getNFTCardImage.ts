export const getNFTCardImage = (imgUrl: string) => {
  if (imgUrl.startsWith('ipfs://')) {
    return `https://ipfs.io/${imgUrl.substring(7)}`;
  }
  return imgUrl;
};
