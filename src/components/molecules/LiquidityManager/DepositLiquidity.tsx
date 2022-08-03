import { Box, Button, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { DepositBtn } from './DepositBtn';
import { DepositMsg } from './DepositMsg';

interface Props {
  walletMax: number;
}

export const DepositLiquidity: React.FC<Props> = ({ walletMax }) => {
  const [liquidityToDepositStr, setLiquidityToDepositStr] = useState('');

  const isInputBlank = liquidityToDepositStr === '';

  const isInputConvertibleToNumber = !isNaN(Number(liquidityToDepositStr));

  const doesInputExceedsMax =
    isInputConvertibleToNumber && Number(liquidityToDepositStr) > walletMax;

  return (
    <div>
      <Flex>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            value={liquidityToDepositStr}
            onChange={(e) => setLiquidityToDepositStr(e.target.value)}
          />

          <InputRightElement width="5.5rem">
            <Box mr="0.5rem">Ξ</Box>
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setLiquidityToDepositStr(String(walletMax))}
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
            ? 'Amount exceeds ETH balance'
            : ''}
        </Box>
      )}
      <Flex>
        <DepositBtn
          isDisabled={isInputBlank || !isInputConvertibleToNumber || doesInputExceedsMax}
        />
      </Flex>
      <Box mt="1rem">
        <DepositMsg />
      </Box>
    </div>
  );
};
