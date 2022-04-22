import React, { useEffect, useState } from 'react';
import { Box, BoxProps, Button, SimpleGrid } from '@chakra-ui/react';
import NFTNoOfferCard from '../../../../components/molecules/NFTNoOfferCard/index';

import { useWallets } from '@web3-onboard/react';

import Icon from 'components/atoms/Icon';

interface Props extends BoxProps {
  isSidebarOpen: boolean;
  showSidebar(): void;
}

interface WalletNft {
  blockhash: string;
  ownedNfts: any[];
  totalCount: number;
}

const Content: React.FC<Props> = ({ isSidebarOpen, showSidebar, ...restProps }) => {
  const connectedWallets = useWallets();

  const [walletNft, setWalletNft] = useState<WalletNft>();

  const [collectionOffers, setCollectionOffers] = useState([]);

  const getWalletNFTs = async () => {
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
    getWalletNFTs();
    if (walletNft) {
      console.log('walletNFTs', walletNft);
    }
  }, [connectedWallets]);

  useEffect(() => {
    getCollectionOffers();
    console.log('collectionOffers', collectionOffers);
  }, [walletNft]);

  return (
    <Box {...restProps}>
      {!isSidebarOpen && (
        <Button variant="primary" color="solid.gray0" onClick={showSidebar} borderRadius="9px">
          <Icon name="sliders" />
        </Button>
      )}

      <SimpleGrid columns={3} spacing={10}>
        {walletNft?.ownedNfts.map((item) => (
          <NFTNoOfferCard
            key={item.id.tokenId}
            collectionName=""
            tokenName={`${item.title}`}
            id={`${item.id.tokenId}`}
            img={item.metadata.image ? `${item.metadata.image}` : `${item.metadata.image_url}`}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Content;
