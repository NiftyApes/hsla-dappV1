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
    <Box
      boxShadow="0px 0px 21px 0px #3A00831A"
      border="1px solid"
      borderColor="accents.100"
      bg="solid.white"
      borderRadius="1rem"
      p="1rem"
      minWidth="700px"
    >
      {_.isNil(availableEthLiquidity) || _.isNil(totalEthLoanedOut) ? (
        <LiquidityInfoLoading />
      ) : (
        <Flex>
          <LiquidityPieChart />
          <EthLiquidityInfo />
        </Flex>
      )}
    </Box>
  );
};
