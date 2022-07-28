import { Box, BoxProps, Button, Flex } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import { useChainId } from 'hooks/useChainId';
import { ReactElement } from 'react';
import { LocalWalletNFTs } from './LocalWalletNFTs';
import { TestnetWalletNFTs } from './TestnetWalletNFTs';
import { MainnetWalletNFTs } from './MainnetWalletNFTs';

const SIDEBAR_BUTTON_TRANSITION_TIME = '.1s';

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

  const contentMap: Record<string, () => ReactElement> = {
    '0x1': () => <LocalWalletNFTs />,
    '0x4': () => <TestnetWalletNFTs />,
    '0x7a69': () => <MainnetWalletNFTs />,
  };
  const getContent = () => (chainId && contentMap[chainId] ? contentMap[chainId]() : null);

  return (
    <Flex {...restProps}>
      <Box
        flex={isSidebarOpen ? 0.00001 : 1}
        maxWidth="50px"
        transition={`flexGrow ${SIDEBAR_BUTTON_TRANSITION_TIME}`}
        overflow="hidden"
      >
        <Button variant="primary" color="solid.gray0" onClick={showSidebar} borderRadius="9px">
          <Icon name="sliders" />
        </Button>
      </Box>
      <Box flex={1}>{getContent()}</Box>
    </Flex>
  );
};

export default Content;
