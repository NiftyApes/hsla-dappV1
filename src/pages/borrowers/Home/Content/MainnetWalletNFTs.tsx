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

  const [walletNfts, setWalletNfts] = useState<WalletNft>();

  const getMainnetWalletNFTs = async () => {
    // make api key an env variable
    const callWalletNfts = await fetch(
      `https://eth-mainnet.g.alchemy.com/v2/Of3Km_--Ow1fNnMhaETmwnmWBFFHF3ZY/getNFTs?owner=${connectedWallets[0].accounts[0].address}`,
    );
    setWalletNfts(await callWalletNfts.json());
  };

  useEffect(() => {
    getMainnetWalletNFTs();
  }, [connectedWallets]);

  return (
    <>
      {walletNfts?.ownedNfts.map((item) => (
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
