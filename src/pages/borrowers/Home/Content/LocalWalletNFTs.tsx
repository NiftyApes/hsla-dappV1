import React, { useEffect, useState } from 'react';
import { useConnectWallet } from '@web3-onboard/react';
import { useLocalScaffoldEthNFTContract } from '../../../../hooks/useLocalScaffoldEthNFTContract';
import { useSlowWayToGetNFTsOfAddress } from '../../../../hooks/useSlowWayToGetNFTsOfAddress';
import { NFTCardContainer } from './NFTCardContainer';
import { SimpleGrid } from '@chakra-ui/react';

import SectionHeader from 'components/molecules/SectionHeader';

export const LocalhostContent: React.FC = () => {
  const [{ wallet }] = useConnectWallet();

  const [walletNfts, setWalletNfts] = useState<any>();

  const scaffoldEthNFTContract = useLocalScaffoldEthNFTContract();
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
      <SectionHeader headerText="NFTs with Offers"></SectionHeader>
      {console.log('logging', { walletNfts })}
      <SimpleGrid columns={3} spacing={10} style={{ padding: '16px' }}>
        {walletNfts?.map((item: any) => (
          <NFTCardContainer contract={scaffoldEthNFTContract} item={item} key={item.id} />
        ))}
      </SimpleGrid>
    </>
  );
};
