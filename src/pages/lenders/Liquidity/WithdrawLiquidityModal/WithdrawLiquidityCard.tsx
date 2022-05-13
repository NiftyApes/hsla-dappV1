import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import React from 'react';

const WithdrawLiqudityCard: React.FC = () => {
  return (
    <Box
      boxShadow="0px 0px 21px 0px #3A00831A"
      border="1px solid"
      borderColor="accents.100"
      bg="solid.white"
      borderRadius="15px"
      p="30px"
    >
      <Flex>
        <Input
          defaultValue="00.00"
          bg="accents.100"
          border="none"
          p="16px"
          fontSize="3.5xl"
          h="100%"
        />
        <Button
          variant="neutralReverse"
          fontSize="sm"
          fontWeight="normal"
          ml="8px"
          h="66px"
          px="36px"
        >
          WITHDRAW
        </Button>
      </Flex>
      <Flex
        justifyContent="space-between"
        mt="42px"
        textAlign="center"
        sx={{
          'div > p:first-of-type': {
            fontSize: 'sm',
            mb: '8px',
            color: 'solid.gray0',
          },
          'div > p:nth-child(2)': {
            fontSize: '2.5xl',
            fontWeight: 'bold',
          },
        }}
      >
        <Box>
          <Text>NiftyApes Protocol Balance</Text>
          <Text>~340.356..Ξ</Text>
        </Box>
        <Box>
          <Text>Balance After Deposit</Text>
          <Text>340.856..Ξ</Text>
        </Box>
        <Box>
          <Flex alignItems="center">
            <Text mr="4px">Passive Interest</Text>
            <Icon name="help-circle" size={14} color="solid.gray2" />
          </Flex>
          <Text color="#24DFA5 !important">0.14%</Text>
        </Box>
      </Flex>
      <Text textAlign="center" fontSize="sm" fontWeight="bold" mt="40px">
        Why Lock Liquidity?
      </Text>
      <Text textAlign="center" m="0 auto" mt="5px" fontSize="sm" color="solid.gray0" maxW="540px">
        Lock your funds in the NiftyApes Protocol to begin serving loans. When your funds aren’t in
        active use, they’re sent to Compound.Finance to earn passive interest.
      </Text>
    </Box>
  );
};

export default WithdrawLiqudityCard;