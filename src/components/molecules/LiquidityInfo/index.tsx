import { Box, Flex } from '@chakra-ui/react';
import { EthLiquidityInfo } from './EthLiquidityInfo';
import { LiquidityPieChart } from './LiquidityPieChart';

export const LiquidityInfo: React.FC = () => {
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
      <Flex>
        <LiquidityPieChart />
        <EthLiquidityInfo />
      </Flex>
    </Box>
  );
};
