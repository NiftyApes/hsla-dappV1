import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { useChainId } from 'hooks/useChainId';
import { GnosisHedgeyNFTs } from './GnosisHedgeyNFTs';
import { GoerliWalletNFTs } from './GoerliWalletNFTs';
import { LocalhostContent } from './LocalWalletNFTs';
import { MainnetWalletNFTs } from './MainnetWalletNFTs';

interface Props extends BoxProps {}

const Content: React.FC<Props> = ({ ...restProps }) => {
  const chainId = useChainId();
  const NFTs =
    chainId === '0x1' ? (
      <MainnetWalletNFTs />
    ) : chainId === '0x5' ? (
      <GoerliWalletNFTs />
    ) : chainId === '0x7a69' ? (
      <LocalhostContent />
    ) : chainId === '0x64' ? (
      <GnosisHedgeyNFTs />
    ) : null;

  return (
    <Flex {...restProps}>
      <Box flexGrow={1}>{NFTs}</Box>
    </Flex>
  );
};

export default Content;
