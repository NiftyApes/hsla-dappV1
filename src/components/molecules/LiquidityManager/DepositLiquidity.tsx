import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from '@chakra-ui/react';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { useDepositEthLiquidity } from 'hooks/useDepositEthLiquidity';
import { useWalletBalance } from 'hooks/useWalletBalance';
import { useState } from 'react';
import { DepositBtn } from './DepositBtn';
import { DepositMsg } from './DepositMsg';
import CryptoIcon from 'components/atoms/CryptoIcon';

export const DepositLiquidity: React.FC = () => {
  const balance = useWalletBalance();

  const { depositETHLiquidity, depositStatus, txObject } = useDepositEthLiquidity();

  const [liquidityToDepositStr, setLiquidityToDepositStr] = useState('');

  const isInputBlank = liquidityToDepositStr === '';

  const isInputConvertibleToNumber = !isNaN(Number(liquidityToDepositStr));

  const doesInputExceedsMax = !!(
    isInputConvertibleToNumber &&
    balance &&
    Number(liquidityToDepositStr) > balance
  );

  const isDepositBtnDisabled =
    depositStatus !== 'READY' || isInputBlank || !isInputConvertibleToNumber || doesInputExceedsMax;

  return (
    <div>
      <Flex>
        <InputGroup size="md">
          <InputLeftElement m=".25rem">
            <CryptoIcon symbol="eth" size={25} />
          </InputLeftElement>
          {/* <InputLeftAddon children='ETH' /> */}
          <Input
            pr="4.5rem"
            size="lg"
            type="number"
            value={liquidityToDepositStr}
            onChange={(e) => setLiquidityToDepositStr(e.target.value)}
            disabled={depositStatus !== 'READY'}
          />
          <InputRightElement width="5.5rem">
            <Button
              colorScheme="purple"
              variant="link"
              size="lg"
              pt=".5rem"
              textTransform={'uppercase'}
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
      {depositStatus === 'READY' && (!isInputConvertibleToNumber || doesInputExceedsMax) && (
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
          isDisabled={isDepositBtnDisabled}
        />
      </Flex>
      <DepositMsg />
    </div>
  );
};
