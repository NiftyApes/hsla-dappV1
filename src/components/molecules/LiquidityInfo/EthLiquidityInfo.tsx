import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
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

  if (_.isNil(availableEthLiquidity) || _.isNil(totalEthLoanedOut)) {
    return null;
  }

  return (
    <Box>
      <Table mt="3rem" style={{ tableLayout: 'fixed' }}>
        <Thead>
          <Tr
            sx={{
              '& > th': {
                fontWeight: 'bold',
                // scales from 1.125rem to 0.75rem when 1vw is in between
                fontSize: 'min(1.125rem, max(0.75rem, 1vw))',
                color: 'solid.gray0',
                border: 'none',
              },
            }}
          >
            <Th style={{ whiteSpace: 'nowrap' }}>Total</Th>
            <Th>
              <Flex alignItems="center">
                <Text mr="5px" style={{ whiteSpace: 'nowrap' }}>
                  Available
                </Text>
                <AvailablePopover />
              </Flex>
            </Th>
            <Th>
              <Flex alignItems="center">
                <Icon name="lock" color="solid.gray0" size={10} />
                <Text mx="5px" style={{ whiteSpace: 'nowrap' }}>
                  In Use
                </Text>
                <InUsePopover />
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            sx={{
              td: {
                border: 'none',
                fontSize: '1.125rem',
                paddingLeft: '1.25rem',
                paddingTop: '0.25rem',
              },
            }}
          >
            <Td>
              <Flex alignItems="center">
                <CryptoIcon symbol="eth" size={25} />
                <Text ml="8px">
                  {Number((availableEthLiquidity + totalEthLoanedOut).toFixed(2))}
                </Text>
              </Flex>
            </Td>
            <Td>
              <Flex alignItems="center">
                <CryptoIcon symbol="eth" size={25} />
                <Text ml="8px">{Number(availableEthLiquidity.toFixed(2))}</Text>
              </Flex>
            </Td>
            <Td>
              <Flex alignItems="center">
                <CryptoIcon symbol="eth" size={25} />
                <Text ml="8px">{Number(totalEthLoanedOut.toFixed(2))}</Text>
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};
