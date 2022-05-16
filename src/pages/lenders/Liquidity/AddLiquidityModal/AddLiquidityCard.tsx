import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { useDepositEthLiquidity } from 'hooks/useDepositEthLiquidity';
import { useWalletBalance } from 'hooks/useWalletBalance';
import React, { useState } from 'react';

const AddLiquidityCard: React.FC = () => {
  const [amtToDeposit, setAmtToDeposit] = useState<string>();

  const ethInWallet = useWalletBalance();

  const { depositETHLiquidity: depositEthLiquidity, ethLiquidity } = useDepositEthLiquidity();

  const [depositEthLiquidityStatus, setDepositEthLiquidityStatus] = useState<string>('READY');

  const newEthLiquidityStrWithAtLeast2Decimals =
    ethLiquidity &&
    amtToDeposit &&
    (Number(ethLiquidity) + Number(amtToDeposit)).toFixed(
      Math.max(
        2,
        (ethLiquidity.split('.')[1] && ethLiquidity.split('.')[1].length) || 0,
        (amtToDeposit.split('.')[1] && amtToDeposit.split('.')[1].length) || 0,
      ),
    );

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
          placeholder="0"
          value={amtToDeposit}
          onChange={(e) => setAmtToDeposit(e.target.value)}
          bg="accents.100"
          border="none"
          p="16px"
          fontSize="3.5xl"
          h="100%"
          disabled={depositEthLiquidityStatus !== 'READY'}
        />
        <Button
          variant="neutralReverse"
          fontSize="sm"
          fontWeight="normal"
          ml="8px"
          h="66px"
          px="36px"
          disabled={
            depositEthLiquidityStatus !== 'READY' ||
            (ethInWallet !== undefined && ethInWallet < Number(amtToDeposit))
          }
          onClick={() =>
            depositEthLiquidity &&
            amtToDeposit &&
            depositEthLiquidity({
              ethToDeposit: amtToDeposit,
              onPending: () => setDepositEthLiquidityStatus('PENDING'),
              onSuccess: () => {
                setDepositEthLiquidityStatus('SUCCESS');
                setTimeout(() => {
                  setDepositEthLiquidityStatus('READY');
                  setAmtToDeposit('');
                }, 1000);
              },
              onError: (e: any) => alert(e),
            })
          }
        >
          LOCK LIQUIDITY{' '}
          {depositEthLiquidityStatus === 'PENDING' ? (
            <span style={{ paddingLeft: '8px' }}>
              <LoadingIndicator size="xs" />
            </span>
          ) : null}
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
          <Text>{ethLiquidity}</Text>
        </Box>
        <Box>
          <Text>Balance After Deposit</Text>
          <Text
            style={{ color: Number(ethLiquidity) - Number(amtToDeposit) < 0 ? 'red' : 'black' }}
          >
            {ethLiquidity && amtToDeposit ? newEthLiquidityStrWithAtLeast2Decimals : ethLiquidity}
          </Text>
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

export default AddLiquidityCard;
