import { Box, Flex } from '@chakra-ui/react';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useTotalEthLoanedOut } from 'hooks/useTotalEthLoanedOut';
import _ from 'lodash';
import { EthLiquidityInfo } from './EthLiquidityInfo';
import { LiquidityInfoLoading } from './LiquidityInfoLoading';
import { LiquidityPieChart } from './LiquidityPieChart';

export const LiquidityInfo: React.FC = () => {
  const { totalEthLoanedOut } = useTotalEthLoanedOut();

  const { availableEthLiquidity } = useAvailableEthLiquidity();

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
