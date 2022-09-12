import { Box, Center } from '@chakra-ui/react';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useTotalEthLoanedOut } from 'hooks/useTotalEthLoanedOut';
import _ from 'lodash';
import { PieChart } from 'react-minimal-pie-chart';

export const LiquidityPieChart: React.FC = () => {
  const { totalEthLoanedOut } = useTotalEthLoanedOut();

  const { availableEthLiquidity } = useAvailableEthLiquidity();

  // We use _.isNil so that these evaluate to true if they're equal to 0.
  if (_.isNil(totalEthLoanedOut) || _.isNil(availableEthLiquidity)) {
    return null;
  }

  const data = [];

  // Placeholder chart when no liquidity
  if (totalEthLoanedOut === 0 && availableEthLiquidity === 0) {
    data.push({
      title: 'No Liquidity Yet',
      value: 1, // needs to be non-zero to fill up chart
      color: '#eee',
    });

    return (
      <Box>
        <Center sx={{ fontWeight: 'bold', color: 'solid.gray0' }} mt="1rem">
          LIQUIDITY BREAKDOWN
        </Center>
        <Box minW="max(25vw, 240px)" minH="max(25vh, 240px)" mt="1rem">
          <PieChart
            lineWidth={25}
            labelPosition={116}
            labelStyle={() => ({ fontSize: '20px' })}
            radius={100}
            data={data}
            label={({ dataEntry }) => '0Ξ'}
            viewBoxSize={[400, 300]}
            center={[200, 130]}
          />
        </Box>
      </Box>
    );
  }

  if (totalEthLoanedOut) {
    data.push({
      title: 'In Use',
      value: Number(totalEthLoanedOut.toFixed(2)),
      color: '#f8c743',
    });
  }

  if (availableEthLiquidity) {
    data.push({
      title: 'Available',
      value: Number(availableEthLiquidity.toFixed(2)),
      color: '#9ecbf9',
    });
  }

  return (
    <Box>
      <Center sx={{ fontWeight: 'bold', color: 'solid.gray0' }} mt="1rem">
        LIQUIDITY BREAKDOWN
      </Center>
      <Box minW="max(25vw, 240px)" minH="max(25vh, 240px)" mt="1rem">
        <PieChart
          lineWidth={25}
          labelPosition={116}
          labelStyle={() => ({ fontSize: '20px' })}
          radius={100}
          data={data}
          label={({ dataEntry }) =>
            `${dataEntry.title === 'In Use' ? '🔒' : ''}${Number(dataEntry.value.toFixed(2))}Ξ`
          }
          viewBoxSize={[400, 300]}
          center={[200, 130]}
        />
      </Box>
    </Box>
  );
};
