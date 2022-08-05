import { Box, Button, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { useWithdrawEthLiquidity } from 'hooks/useWithdrawEthLiquidity';
import { useState } from 'react';
import { WithdrawBtn } from './WithdrawBtn';

export const WithdrawLiquidity: React.FC = () => {
  const { withdrawETHLiquidity, withdrawStatus, txObject, ethLiquidity } =
    useWithdrawEthLiquidity();

  const [liquidityToWithdrawStr, setLiquidityToWithdrawStr] = useState('');

  const isInputBlank = liquidityToWithdrawStr === '';

  const isInputConvertibleToNumber = !isNaN(Number(liquidityToWithdrawStr));

  const doesInputExceedsMax = !!(
    isInputConvertibleToNumber &&
    ethLiquidity &&
    Number(liquidityToWithdrawStr) > Number(ethLiquidity)
  );

  const isWithdrawBtnDisabled =
    withdrawStatus !== 'READY' ||
    isInputBlank ||
    !isInputConvertibleToNumber ||
    doesInputExceedsMax;

  return (
    <div>
      <Flex>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            value={liquidityToWithdrawStr}
            onChange={(e) => setLiquidityToWithdrawStr(e.target.value)}
          />
          <InputRightElement width="5.5rem">
            <Box mr="0.5rem">Ξ</Box>
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => ethLiquidity && setLiquidityToWithdrawStr(String(ethLiquidity))}
            >
              max
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      {withdrawStatus === 'PENDING' && (
        <Box ml="0.25rem" mt="0.25rem">
          Withdrawing liquidity <LoadingIndicator size="sm" />
          <br />
          {txObject?.hash}
        </Box>
      )}
      {withdrawStatus === 'SUCCESS' && (
        <Box ml="0.25rem" mt="0.25rem" color="green.500">
          Liquidity withdrawn successfully!
        </Box>
      )}
      {withdrawStatus === 'ERROR' && (
        <Box ml="0.25rem" mt="0.25rem" color="red.500">
          There was an error when attempting to withdraw liquidity.
        </Box>
      )}
      {(!isInputConvertibleToNumber || doesInputExceedsMax) && (
        <Box fontSize="small" ml="0.25rem" color="red.500">
          {!isInputConvertibleToNumber
            ? 'Input is not a number'
            : doesInputExceedsMax
            ? 'Amount exceeds withdrawable ETH'
            : ''}
        </Box>
      )}
      <Flex>
        <WithdrawBtn
          onClick={() => {
            withdrawETHLiquidity({
              ethToWithdraw: Number(liquidityToWithdrawStr),
              cleanup: () => setLiquidityToWithdrawStr(''),
            });
          }}
          isDisabled={isWithdrawBtnDisabled}
        />
      </Flex>
    </div>
  );
};
