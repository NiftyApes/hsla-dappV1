import { Box, Center } from '@chakra-ui/react';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useTotalEthLoanedOut } from 'hooks/useTotalEthLoanedOut';
import _ from 'lodash';
import { PieChart } from 'react-minimal-pie-chart';

export const LiquidityPieChart: React.FC = () => {
  const { totalEthLoanedOut } = useTotalEthLoanedOut();

  const { ethLiquidity } = useAvailableEthLiquidity();

  if (_.isNil(totalEthLoanedOut) || _.isNil(ethLiquidity)) {
    return null;
  }

  const data = [];

  if (totalEthLoanedOut) {
    data.push({
      title: 'In Use',
      value: Number(String(totalEthLoanedOut.toFixed(2))),
      color: '#f8c743',
    });
  }

  if (ethLiquidity) {
    data.push({
      title: 'Available',
      value: Number(String(ethLiquidity.toFixed(2))),
      color: '#9ecbf9',
    });
  }

  return (
    <Box>
      <Center sx={{ fontWeight: 'bold', color: 'solid.gray0' }}>LIQUIDITY BREAKDOWN</Center>
      <Box minW="max(25vw, 240px)" minH="max(25vh, 240px)" mt="1rem">
        <PieChart
          lineWidth={25}
          labelPosition={116}
          labelStyle={() => ({ fontSize: '24px' })}
          radius={120}
          data={data}
          label={({ dataEntry }) =>
            `${dataEntry.title === 'In Use' ? '🔒' : ''}${String(
              Number(dataEntry.value.toFixed(2)),
            )}Ξ`
          }
          viewBoxSize={[400, 400]}
          center={[220, 180]}
        />
      </Box>
    </Box>
  );
};
