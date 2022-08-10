import React, { useEffect, useState } from 'react';
import NFTNoOfferCard from '../../../../components/molecules/NFTNoOfferCard/index';
import { useWallets } from '@web3-onboard/react';
import { SimpleGrid } from '@chakra-ui/react';

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

  const getThumbnail = (item: any) => {
    const media =
      Array.isArray(item.media) && item.media.length > 0
        ? item.media[0].thumbnail || item.media[0].gateway
        : null;
    return media || item.metadata.image_url;
  };

  return (
    <SimpleGrid minChildWidth="200px" spacing={10} style={{ padding: '16px' }}>
      {walletNfts?.ownedNfts.map((item) => {
        return (
          <NFTNoOfferCard
            key={`${item.contract.address}:${item.id.tokenId}`}
            tokenName={item.title}
            tokenId={item.id.tokenId}
            img={getThumbnail(item)}
          />
        );
      })}
    </SimpleGrid>
  );
};
