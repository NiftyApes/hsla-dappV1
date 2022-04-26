import React, { useEffect, useState } from 'react';
import NFTNoOfferCard from '../../../../components/molecules/NFTNoOfferCard/index';
import { useWallets } from '@web3-onboard/react';

interface WalletNft {
  blockhash: string;
  ownedNfts: any[];
  totalCount: number;
}

export const MainnetContent: React.FC = () => {
  const connectedWallets = useWallets();

  const [walletNft, setWalletNft] = useState<WalletNft>();

  const [collectionOffers, setCollectionOffers] = useState([]);

  const getMainnetWalletNFTs = async () => {
    // make api key an env variable
    const callWalletNfts = await fetch(
      `https://eth-mainnet.g.alchemy.com/v2/Of3Km_--Ow1fNnMhaETmwnmWBFFHF3ZY/getNFTs?owner=${connectedWallets[0].accounts[0].address}`,
    );
    setWalletNft(await callWalletNfts.json());

    // check collection arr for contract address, if not present push to array
  };

  const getCollectionOffers = async () => {
    // loop through collection arr and query each address for offers
    setCollectionOffers([]);
  };

  useEffect(() => {
    getMainnetWalletNFTs();
  }, [connectedWallets]);

  useEffect(() => {
    getCollectionOffers();
    console.log('collectionOffers', collectionOffers);
  }, [walletNft]);

  return (
    <>
      {walletNft?.ownedNfts.map((item) => (
        <NFTNoOfferCard
          key={item.id.tokenId}
          collectionName=""
          tokenName={`${item.title}`}
          id={`${item.id.tokenId}`}
          img={item.metadata.image ? `${item.metadata.image}` : `${item.metadata.image_url}`}
        />
      ))}
    </>
  );
};