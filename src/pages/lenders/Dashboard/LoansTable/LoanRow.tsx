import { Box, Flex, Image, Td, Text, Tr } from '@chakra-ui/react';

import Icon from 'components/atoms/Icon';
import { ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { useLoanAuction } from 'hooks/useLoanAuction';
import moment from 'moment';

export const LoanRow = ({ loanFromDb }: any) => {
  const loanFromChain = useLoanAuction({
    nftContractAddress: loanFromDb.nftContractAddress,
    nftId: loanFromDb.nftId,
  });

  if (!loanFromChain) {
    return null;
  }

  console.log('loanFromChain', loanFromChain);

  return (
    <Tr
      border="1px solid red"
      sx={{
        td: {
          border: 'none',
          fontSize: 'md',
          textAlign: 'center',
        },
      }}
    >
      <Td>
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text fontWeight="bold" fontSize="xs" color="solid.gray0" mt="4px">
            {loanFromDb.nftContractAddress}
          </Text>
          <Image src="/assets/mocks/bored_ape_square.png" w="55px" h="55px" objectFit="cover" />
          <Flex mt="-10px">
            <Icon name="os" size={25} />
            <Box border="2px solid" borderRadius="50%" borderColor="solid.white" bgColor="white">
              <Icon name="etherscan" size={20} />
            </Box>
          </Flex>
          <Text fontWeight="bold" fontSize="sm">
            {loanFromDb.nftId}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Box textAlign="left">
          <Text fontSize="xl" fontWeight="bold">
            {ethers.utils.formatEther(loanFromChain.amount)}Ξ at{' '}
            {roundForDisplay(
              getAPR({
                amount: loanFromChain.amount,
                interestRatePerSecond: loanFromChain.interestRatePerSecond,
              }),
            )}
            % for{' '}
            {moment
              .duration(
                loanFromChain.loanEndTimestamp - loanFromChain.loanBeginTimestamp,
                'seconds',
              )
              .asDays()}{' '}
            days
          </Text>
        </Box>
      </Td>
      <Td>
        <Text fontSize="md" color="notification.info" fontWeight="bold">
          {moment(loanFromChain.loanEndTimestamp * 1000).toNow(true)}
        </Text>
      </Td>
      <Td>
        <Flex flexDir="column" alignItems="center">
          <Box>
            <Text color="notification.alert" fontSize="xl" fontWeight="bold">
              0.0000Ξ
            </Text>
            <Text color="solid.gray0" fontSize="2xs" textAlign="left">
              Defaulted
            </Text>
          </Box>
        </Flex>
      </Td>
    </Tr>
  );
};
