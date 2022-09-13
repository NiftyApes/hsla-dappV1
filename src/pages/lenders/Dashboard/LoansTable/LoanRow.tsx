import { Box, Button, Flex, Td, Text, Tr } from '@chakra-ui/react';

import Icon from 'components/atoms/Icon';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { useCalculateInterestAccrued } from 'hooks/useCalculateInterestAccrued';
import { useLoanAuction } from 'hooks/useLoanAuction';
import { useSeizeAsset } from 'hooks/useSeizeAsset';
import moment from 'moment';

export const LoanRow = ({ loanFromDb }: any) => {
  const loanFromChain = useLoanAuction({
    nftContractAddress: loanFromDb.nftContractAddress,
    nftId: loanFromDb.nftId,
  });

  const accruedInterest = useCalculateInterestAccrued({
    nftContractAddress: loanFromDb.nftContractAddress,
    nftId: loanFromDb.nftId,
  });

  const [lenderInterestAsBigNumber] = accruedInterest || [];

  const { seizeAsset, seizeStatus } = useSeizeAsset({
    nftContractAddress: loanFromDb.nftContractAddress,
    nftId: loanFromDb.nftId,
  });

  if (!loanFromChain) {
    return null;
  }

  const endMoment = moment(loanFromChain.loanEndTimestamp * 1000);
  const isDefaulted = moment().isAfter(endMoment);

  return (
    <>
      <Tr
        borderTop="1px solid #eee"
        borderRight="1px solid #eee"
        borderLeft="1px solid #eee"
        borderBottom={!isDefaulted ? '1px solid #eee' : undefined}
        sx={{
          td: {
            border: 'none',
            fontSize: 'md',
            textAlign: 'center',
          },
        }}
      >
        <Td rowSpan={isDefaulted ? 2 : 1}>
          <Flex flexDir="column" alignItems="center">
            <Text fontWeight="bold" fontSize="xs" color="solid.gray0" mt="4px">
              <span
                style={{
                  display: 'inline-block',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  width: '80px',
                }}
              >
                {loanFromDb.nftContractAddress}
              </span>
            </Text>
            <Flex>
              <Icon name="os" size={25} />
              <Box border="2px solid" borderRadius="50%" borderColor="solid.white" bgColor="white">
                <Icon name="etherscan" size={20} />
              </Box>
            </Flex>
            <Text fontWeight="bold" fontSize="sm">
              #{loanFromDb.nftId}
            </Text>
          </Flex>
        </Td>
        <Td>
          <Flex>
            <Box flex="1" />
            <Flex flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
              <Text fontSize="sm" mb="10px">
                Initiated {moment(loanFromChain.loanBeginTimestamp * 1000).format('MMM D, YYYY')}
              </Text>
              <Box mb="2px">
                <Text as="span" fontSize="xl" fontWeight="bold">
                  {ethers.utils.formatEther(loanFromChain.amount)}Ξ
                </Text>{' '}
                <Text as="span" color="#555">
                  {moment
                    .duration(
                      loanFromChain.loanEndTimestamp - loanFromChain.loanBeginTimestamp,
                      'seconds',
                    )
                    .asDays()}{' '}
                  days,
                </Text>
              </Box>
              <Box>
                <Text as="span" fontWeight="bold">
                  {roundForDisplay(
                    getAPR({
                      amount: loanFromChain.amount,
                      interestRatePerSecond: loanFromChain.interestRatePerSecond,
                    }),
                  )}
                  %
                </Text>{' '}
                <Text as="span" color="#555">
                  APR
                </Text>
              </Box>
            </Flex>
            <Box flex="1" />
          </Flex>
        </Td>
        <Td>
          <Text
            fontSize="md"
            color={isDefaulted ? 'notification.alert' : 'notification.info'}
            fontWeight="bold"
          >
            {isDefaulted ? 'Defaulted' : 'Active Loan'}
          </Text>
          <Text fontSize="sm" fontStyle="italic">
            {moment(loanFromChain.loanEndTimestamp * 1000).toNow(true)}{' '}
            {isDefaulted ? 'ago' : 'remaining'}
          </Text>
        </Td>
        <Td>
          <Text fontSize="sm">
            {lenderInterestAsBigNumber &&
              `${roundForDisplay(Number(ethers.utils.formatEther(lenderInterestAsBigNumber)))}Ξ`}
          </Text>
        </Td>
      </Tr>
      {isDefaulted && (
        <Tr
          borderBottom="1px solid #eee"
          borderRight="1px solid #eee"
          borderLeft="1px solid #eee"
          sx={{
            td: {
              border: 'none',
              fontSize: 'md',
              textAlign: 'center',
            },
          }}
        >
          <Td colSpan={3}>
            <Button
              disabled={seizeStatus !== 'READY'}
              colorScheme="red"
              w="100%"
              onClick={() => seizeAsset && seizeAsset()}
            >
              Seize
              {seizeStatus !== 'READY' ? (
                <Flex as="span" alignItems="center" ml="8px">
                  <LoadingIndicator size="sm" />
                </Flex>
              ) : null}
            </Button>
          </Td>
        </Tr>
      )}
    </>
  );
};
