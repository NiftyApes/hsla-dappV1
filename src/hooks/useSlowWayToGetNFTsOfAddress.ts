import { Contract } from 'ethers';
import { useEffect, useState } from 'react';

export const useSlowWayToGetNFTsOfAddress = ({
  address,
  contract,
}: {
  address?: string;
  contract?: Contract;
}) => {
  const [nfts, setNfts] = useState<any>();

  useEffect(() => {
    async function loadNFTs() {
      if (!address || !contract) {
        return undefined;
      }

      const totalSupplyNumber = (await contract.totalSupply()).toNumber();

      const results = [];

      for (let i = 0; i < totalSupplyNumber; i++) {
        const tokenId = await contract.tokenByIndex(i);
        const tokenURI = await contract.tokenURI(tokenId);
        const response = await fetch(tokenURI);
        const json = await response.json();
        const owner = await contract.ownerOf(tokenId);
        results.push({ id: tokenId, owner, ...json });
      }

      setNfts(results);
    }

    if (!nfts) {
      loadNFTs();
    }
  }, [address, contract]);

  return nfts;
};
