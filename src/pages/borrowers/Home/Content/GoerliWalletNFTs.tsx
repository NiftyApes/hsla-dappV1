import { BoxProps } from '@chakra-ui/react';
import { useAppDispatch } from 'app/hooks';
import { GOERLI } from 'constants/contractAddresses';
import { useLendingContract } from 'hooks/useContracts';
import { useWalletAddress } from 'hooks/useWalletAddress';
import { loadGoerliNFTs, resetNFTsByWalletAddress } from 'nft';
import { useEffect, useState } from 'react';
import { WalletNFTs } from './WalletNFTs';

interface Props extends BoxProps {}

export const GoerliWalletNFTs: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const walletAddress = useWalletAddress();

  const lendingContract = useLendingContract();

  const [hasLoadedNfts, setHasLoadedNfts] = useState<string>();

  useEffect(() => {
    const getGoerliWalletNFTs = async () => {
      if (
        !walletAddress ||
        !lendingContract ||
        hasLoadedNfts === walletAddress
      ) {
        return;
      }

      const ownWalletNftsResult = await fetch(
        `https://eth-goerli.g.alchemy.com/v2/Of3Km_--Ow1fNnMhaETmwnmWBFFHF3ZY/getNFTs?owner=${walletAddress}`,
      );

      const ownWalletNftsJSON = await ownWalletNftsResult.json();

      const escrowedNftsResult = await fetch(
        `https://eth-goerli.g.alchemy.com/v2/Of3Km_--Ow1fNnMhaETmwnmWBFFHF3ZY/getNFTs?owner=${GOERLI.LENDING.ADDRESS}`,
      );

      const escrowedNftsJSON = await escrowedNftsResult.json();

      let escrowedNfts = escrowedNftsJSON.ownedNfts;

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
        loadGoerliNFTs({
          walletAddress,
          nfts: [...escrowedNfts, ...ownWalletNftsJSON.ownedNfts],
        }),
      );

      setHasLoadedNfts(walletAddress);
    };

    getGoerliWalletNFTs();

    return () => {
      dispatch(resetNFTsByWalletAddress());
    };
  }, [walletAddress, lendingContract]);

  return <WalletNFTs />;
};
