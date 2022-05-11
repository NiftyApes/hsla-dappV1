import { Contract } from 'ethers';
import { useEffect, useState } from 'react';
import { useNiftyApesContract } from './useNiftyApesContract';

export const useSlowWayToGetNFTsOfAddress = ({
  address,
  contract,
}: {
  address?: string;
  contract?: Contract;
}) => {
  const [nfts, setNfts] = useState<any>();

  const niftyApesContract = useNiftyApesContract();

  useEffect(() => {
    async function loadNFTs() {
      if (!address || !contract || !niftyApesContract) {
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

        // Add NFT if directly owned by address
        // or in NiftyApes but indirectly owned by address

        if (owner.toUpperCase() === address.toUpperCase()) {
          results.push({ id: tokenId, owner, ...json });
        } else {
          const niftyApesOwner = await niftyApesContract.ownerOf(contract.address, tokenId);

          if (niftyApesOwner.toUpperCase() === address.toUpperCase()) {
            results.push({ id: tokenId, owner, ...json });
          }
        }
      }

      setNfts(results);
    }

    if (!nfts) {
      loadNFTs();
    }
  }, [address, contract, niftyApesContract]);

  return nfts;
};
