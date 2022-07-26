import { Box, BoxProps, Button, Flex } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import { useChainId } from 'hooks/useChainId';
import { LocalhostContent } from './LocalWalletNFTs';
import { MainnetContent } from './MainnetWalletNFTs';

interface Props extends BoxProps {
  isSidebarOpen: boolean;
  showSidebar(): void;
}

interface Props extends BoxProps {
  isSidebarOpen: boolean;
  showSidebar(): void;
}

const Content: React.FC<Props> = ({ isSidebarOpen, showSidebar, ...restProps }) => {
  const chainId = useChainId();

  const NFTs =
    chainId === '0x1' ? <MainnetContent /> : chainId === '0x7a69' ? <LocalhostContent /> : null;

  return (
    <Flex {...restProps}>
      {!isSidebarOpen && (
        <Button variant="primary" color="solid.gray0" onClick={showSidebar} borderRadius="9px">
          <Icon name="sliders" />
        </Button>
      )}

      <Box flexGrow={1}>{NFTs}</Box>
    </Flex>
  );
};

export default Content;
