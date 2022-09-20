import { Box, Flex, Text } from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import Icon from 'components/atoms/Icon';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useTotalEthLoanedOut } from 'hooks/useTotalEthLoanedOut';
import _ from 'lodash';
import { AvailablePopover } from './AvailablePopover';
import { InUsePopover } from './InUsePopover';

export const EthLiquidityInfo: React.FC = () => {
  const { totalEthLoanedOut } = useTotalEthLoanedOut();

  const { availableEthLiquidity } = useAvailableEthLiquidity();

  // We use _.isNil so that these evaluate to true if they're equal to 0.
  // We just want to avoid a NaN flash before they load.
  if (_.isNil(availableEthLiquidity) || _.isNil(totalEthLoanedOut)) {
    return null;
  }

  return (
    <Box>
      <Box>
        <Text color="solid.gray0" fontWeight={600} mb="8px">
          TOTAL
        </Text>
        <Flex alignItems="center">
          <CryptoIcon symbol="eth" size={25} />
          <Text ml="8px">{Number((availableEthLiquidity + totalEthLoanedOut).toFixed(2))}</Text>
        </Flex>
      </Box>

      <Box my="32px">
        <Flex alignItems="center" mb="8px">
          <Text color="solid.gray0" fontWeight={600} mr="5px" style={{ whiteSpace: 'nowrap' }}>
            AVAILABLE
          </Text>
          <AvailablePopover />
        </Flex>
        <Flex alignItems="center">
          <CryptoIcon symbol="eth" size={25} />
          <Text ml="8px">{Number(availableEthLiquidity.toFixed(2))}</Text>
        </Flex>
      </Box>

      <Box my="32px">
        <Flex alignItems="center" mb="8px">
          <Icon name="lock" color="solid.gray0" size={10} />
          <Text color="solid.gray0" fontWeight={600} mx="5px" style={{ whiteSpace: 'nowrap' }}>
            IN USE
          </Text>
          <InUsePopover />
        </Flex>
        <Flex alignItems="center">
          <CryptoIcon symbol="eth" size={25} />
          <Text ml="8px">{Number(totalEthLoanedOut.toFixed(2))}</Text>
        </Flex>
      </Box>
    </Box>
  );
};
