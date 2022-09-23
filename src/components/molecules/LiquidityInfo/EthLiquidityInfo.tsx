import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useTotalEthLoanedOut } from 'hooks/useTotalEthLoanedOut';
import _ from 'lodash';

export const EthLiquidityInfo: React.FC = () => {
  const { totalEthLoanedOut } = useTotalEthLoanedOut();

  const { availableEthLiquidity } = useAvailableEthLiquidity();

  // We use _.isNil so that these evaluate to true if they're equal to 0.
  // We just want to avoid a NaN flash before they load.
  if (_.isNil(availableEthLiquidity) || _.isNil(totalEthLoanedOut)) {
    return null;
  }

  return (
    <Flex direction={'column'} justifyContent="spaceAround">
      <Box mb="1rem">
        <Flex direction={'row'} alignItems="center" mb="8px">
          <Text fontSize={'1.5rem'} mr="8px">
            {Number((availableEthLiquidity + totalEthLoanedOut).toFixed(2))}Ξ
          </Text>
          <Text color="solid.gray0">Total</Text>
        </Flex>
        <Flex alignItems="center"></Flex>
      </Box>

      <Box>
        <Flex direction={'row'} alignItems="center" mb="8px">
          <Text fontSize={'1.5rem'} mr="8px">
            {Number((availableEthLiquidity + totalEthLoanedOut).toFixed(2))}Ξ
          </Text>
          <Text color="solid.gray0">Available to Use</Text>
        </Flex>
        <Text fontSize=".8rem" color="solid.gray0" maxWidth="300px">
          Liquidity earning interest in{' '}
          <Link color="notification.notify" fontWeight="bold" href="compound.finance" isExternal>
            Compound
          </Link>{' '}
          until a borrower accepts your Loan Offer.
        </Text>
      </Box>

      <Box my="32px">
        <Flex direction={'row'} alignItems="center" mb="8px">
          <Text fontSize={'1.5rem'} mr="8px">
            {Number(totalEthLoanedOut.toFixed(2))}Ξ
          </Text>
          {/* <Flex alignItems="center" mb="8px"> */}
          {/* <Icon name="lock" color="solid.gray0" size={10} /> */}
          <Text color="solid.gray0" fontWeight={600} mx="5px" style={{ whiteSpace: 'nowrap' }}>
            🔒 In Use{' '}
          </Text>
          {/* </Flex> */}
        </Flex>
        <Text fontSize=".8rem" color="solid.gray0" maxWidth="300px">
          Liquidity earning interest in active loans. Liquidity used in loans cannot be withdrawn
          until the loan is repaid.
        </Text>
      </Box>
    </Flex>
  );
};
