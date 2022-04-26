import React, { useEffect, useState } from 'react';
import NFTNoOfferCard from '../../../../components/molecules/NFTNoOfferCard/index';
import { useConnectWallet } from '@web3-onboard/react';
import { useScaffoldEthNFTContract } from '../../../../hooks/useScaffoldEthNFTContract';
import { useSlowWayToGetNFTsOfAddress } from '../../../../hooks/useSlowWayToGetNFTsOfAddress';

export const LocalhostContent: React.FC = () => {
  const [{ wallet }] = useConnectWallet();

  const [walletNfts, setWalletNfts] = useState<any>();

  const [collectionOffers, setCollectionOffers] = useState([]);

  const getCollectionOffers = async () => {
    // loop through collection arr and query each address for offers
    setCollectionOffers([]);
  };

  useEffect(() => {
    getCollectionOffers();
    console.log('collectionOffers', collectionOffers);
  }, [walletNfts]);

  const scaffoldEthNFTContract = useScaffoldEthNFTContract();
  const scaffoldEthNFTs = useSlowWayToGetNFTsOfAddress({
    address: wallet?.accounts[0].address,
    contract: scaffoldEthNFTContract,
  });
  const [hasLoadedScaffoldEthFTs, setHasLoadedScaffoldEthNFTs] = useState(false);

  useEffect(() => {
    async function processScaffoldEthNFTsAndAddToState() {
      if (hasLoadedScaffoldEthFTs || !scaffoldEthNFTs) {
        return;
      } else {
        setHasLoadedScaffoldEthNFTs(true);
        setWalletNfts(scaffoldEthNFTs);
      }
    }

    processScaffoldEthNFTsAndAddToState();
  }, [scaffoldEthNFTs, wallet]);

  return (
    <>
      {walletNfts?.map((item: any) => (
        <NFTNoOfferCard
          key={item.id.toNumber()}
          collectionName=""
          tokenName={`${item.name}`}
          id={`${item.id.tokenId}`}
          img={item.image}
        />
      ))}
    </>
  );
};
