import { Box, Button, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { useDepositEthLiquidity } from 'hooks/useDepositEthLiquidity';
import { useWalletBalance } from 'hooks/useWalletBalance';
import { useState } from 'react';
import { DepositBtn } from './DepositBtn';
import { DepositMsg } from './DepositMsg';

export const DepositLiquidity: React.FC = () => {
  const balance = useWalletBalance();

  const [liquidityToDepositStr, setLiquidityToDepositStr] = useState('');

  const isInputBlank = liquidityToDepositStr === '';

  const isInputConvertibleToNumber = !isNaN(Number(liquidityToDepositStr));

  const doesInputExceedsMax = !!(
    isInputConvertibleToNumber &&
    balance &&
    Number(liquidityToDepositStr) > balance
  );

  const { depositETHLiquidity, depositStatus, txObject } = useDepositEthLiquidity();

  return (
    <div>
      <Flex>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            value={liquidityToDepositStr}
            onChange={(e) => setLiquidityToDepositStr(e.target.value)}
            disabled={depositStatus !== 'READY'}
          />
          <InputRightElement width="5.5rem">
            <Box mr="0.5rem">Ξ</Box>
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setLiquidityToDepositStr(String(balance))}
              disabled={depositStatus !== 'READY'}
            >
              max
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      {depositStatus === 'PENDING' && (
        <Box ml="0.25rem" mt="0.25rem">
          Depositing liquidity <LoadingIndicator size="sm" />
          <br />
          {txObject?.hash}
        </Box>
      )}
      {depositStatus === 'SUCCESS' && (
        <Box ml="0.25rem" mt="0.25rem" color="green.500">
          Liquidity deposited successfully!
        </Box>
      )}
      {depositStatus === 'ERROR' && (
        <Box ml="0.25rem" mt="0.25rem" color="red.500">
          There was an error when attempting to deposit liquidity.
        </Box>
      )}
      {(!isInputConvertibleToNumber || doesInputExceedsMax) && (
        <Box fontSize="small" ml="0.25rem" color="red.500">
          {!isInputConvertibleToNumber
            ? 'Input is not a number'
            : doesInputExceedsMax
            ? 'Amount exceeds ETH balance'
            : ''}
        </Box>
      )}
      <Flex>
        <DepositBtn
          onClick={() => {
            depositETHLiquidity({
              ethToDeposit: Number(liquidityToDepositStr),
              cleanup: () => setLiquidityToDepositStr(''),
            });
          }}
          isDisabled={
            depositStatus !== 'READY' ||
            isInputBlank ||
            !isInputConvertibleToNumber ||
            doesInputExceedsMax
          }
        />
      </Flex>
      <DepositMsg />
    </div>
  );
};
