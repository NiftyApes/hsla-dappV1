import { Box, Button, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { WithdrawBtn } from './WithdrawBtn';

interface Props {
  maxWithdrawableLiquidity: number;
}

export const WithdrawLiquidity: React.FC<Props> = ({ maxWithdrawableLiquidity }) => {
  const [liquidityToWithdrawStr, setLiquidityToWithdrawStr] = useState('');

  const isInputBlank = liquidityToWithdrawStr === '';

  const isInputConvertibleToNumber = !isNaN(Number(liquidityToWithdrawStr));

  const doesInputExceedsMax =
    isInputConvertibleToNumber && Number(liquidityToWithdrawStr) > maxWithdrawableLiquidity;

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
              onClick={() => setLiquidityToWithdrawStr(String(maxWithdrawableLiquidity))}
            >
              max
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
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
          isDisabled={isInputBlank || !isInputConvertibleToNumber || doesInputExceedsMax}
        />
      </Flex>
    </div>
  );
};
