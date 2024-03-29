import { Box, BoxProps, Center } from '@chakra-ui/react';
import { useAppDispatch } from 'app/hooks';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { MAINNET } from 'constants/contractAddresses';
import { useLendingContract } from 'hooks/useContracts';
import { useWalletAddress } from 'hooks/useWalletAddress';
import { loadMainnetNFTs, resetNFTsByWalletAddress } from 'nft';
import { useEffect, useState } from 'react';
import { WalletNFTs } from './WalletNFTs';

interface Props extends BoxProps {}

export const MainnetWalletNFTs: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const walletAddress = useWalletAddress();

  const lendingContract = useLendingContract();

  const [hasLoadedNftsOfAddress, setHasLoadedNftsOfAddress] = useState('');

  useEffect(() => {
    const getMainnetWalletNFTs = async () => {
      if (
        !walletAddress ||
        !lendingContract ||
        hasLoadedNftsOfAddress === walletAddress
      ) {
        return;
      }

      let ownWalletNftsPageKey;

      const ownWalletNfts: any[] = [];

      do {
        const ownWalletNftsResult: any = await fetch(
          `https://eth-mainnet.g.alchemy.com/v2/Of3Km_--Ow1fNnMhaETmwnmWBFFHF3ZY/getNFTs?owner=${walletAddress}&pageKey=${ownWalletNftsPageKey}`,
        );

        const ownWalletNftsJSON = await ownWalletNftsResult.json();

        ownWalletNftsPageKey = ownWalletNftsJSON.pageKey;

        ownWalletNfts.push(...ownWalletNftsJSON.ownedNfts);
      } while (ownWalletNftsPageKey);

      let escrowedNftsPageKey;

      let escrowedNfts: any[] = [];

      do {
        const escrowedNftsResult: any = await fetch(
          `https://eth-mainnet.g.alchemy.com/v2/Of3Km_--Ow1fNnMhaETmwnmWBFFHF3ZY/getNFTs?owner=${MAINNET.LENDING.ADDRESS}&pageKey=${escrowedNftsPageKey}`,
        );

        const escrowedNftsJSON = await escrowedNftsResult.json();

        escrowedNftsPageKey = escrowedNftsJSON.pageKey;

        escrowedNfts.push(...escrowedNftsJSON.ownedNfts);
      } while (escrowedNftsPageKey);

      // Keep just the NiftyApes NFTs that are yours
      await Promise.all(
        escrowedNfts.map(async (nft: any, i: number) => {
          const owner = await lendingContract.ownerOf(
            nft.contract.address,
            String(Number(nft.id.tokenId)),
          );

          const isOwnedByWallet =
            owner.toLowerCase() === walletAddress.toLowerCase();

          escrowedNfts[i] = { ...nft, isOwnedByWallet };
        }),
      );

      escrowedNfts = escrowedNfts.filter((nft: any) => nft.isOwnedByWallet);

      dispatch(
        loadMainnetNFTs({
          walletAddress,
          nfts: [...escrowedNfts, ...ownWalletNfts],
        }),
      );

      setHasLoadedNftsOfAddress(walletAddress);
    };

    getMainnetWalletNFTs();
  }, [walletAddress, lendingContract, hasLoadedNftsOfAddress]);

  // reset NFTs on walletAddress change or component unmount
  useEffect(() => {
    return () => {
      dispatch(resetNFTsByWalletAddress());
    };
  }, [walletAddress]);

  return (
    <>
      {walletAddress && !(hasLoadedNftsOfAddress === walletAddress) && (
        <Center fontSize="24px" my="5rem">
          Fetching a list of your NFTs
          <Box ml="2rem">
            <LoadingIndicator />
          </Box>
        </Center>
      )}
      <WalletNFTs />
    </>
  );
};
