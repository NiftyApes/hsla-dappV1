import { Box, Flex, Text } from '@chakra-ui/react';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useTotalEthLoanedOut } from 'hooks/useTotalEthLoanedOut';
import _ from 'lodash';
import { useWalletAddress } from '../../../hooks/useWalletAddress';
import { EmptyPlaceholder } from '../../cards/EmptyPlaceholder';
import { EthLiquidityInfo } from './EthLiquidityInfo';
import { LiquidityInfoLoading } from './LiquidityInfoLoading';
import { LiquidityPieChart } from './LiquidityPieChart';

const i18n = {
  disconnected: 'Please connect your wallet to proceed...',
};

export const LiquidityInfo: React.FC = () => {
  const address = useWalletAddress();
  const { totalEthLoanedOut } = useTotalEthLoanedOut();
  const { availableEthLiquidity } = useAvailableEthLiquidity();

  // Disconnected view
  if (_.isUndefined(address)) {
    return (
      <EmptyPlaceholder>
        <Text>{i18n.disconnected}</Text>
      </EmptyPlaceholder>
    );
  }

  return (
    <Box>
      {_.isNil(availableEthLiquidity) || _.isNil(totalEthLoanedOut) ? (
        <LiquidityInfoLoading />
      ) : (
        <Flex>
          <LiquidityPieChart />
          <Box ml="40px" mt="40px">
            <EthLiquidityInfo />
          </Box>
        </Flex>
      )}
    </Box>
  );
};
