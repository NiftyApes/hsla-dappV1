import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { useChainId } from 'hooks/useChainId';
import { LocalhostContent } from './LocalWalletNFTs';
import { MainnetContent } from './MainnetWalletNFTs';

interface Props extends BoxProps {}

const Content: React.FC<Props> = ({ ...restProps }) => {
  const chainId = useChainId();

  const NFTs =
    chainId === '0x1' ? <MainnetContent /> : chainId === '0x7a69' ? <LocalhostContent /> : null;

  return (
    <Flex {...restProps}>
      <Box flexGrow={1}>{NFTs}</Box>
    </Flex>
  );
};

export default Content;
