import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';

import { useDepositEthLiquidity } from 'hooks/useDepositEthLiquidity';
import React, { useEffect, useState } from 'react';
import { useWalletBalance } from 'hooks/useWalletBalance';
import { useAnalyticsEventTracker } from 'hooks/useAnalyticsEventTracker';
import { ACTIONS, CATEGORIES, LABELS } from 'constants/googleAnalytics';
import { DepositBtn } from './DepositBtn';
import { DepositMsg } from './DepositMsg';
import { ToastSuccessCard } from '../../cards/ToastSuccessCard';

export const DepositLiquidity: React.FC = () => {
  const gaEventTracker = useAnalyticsEventTracker(CATEGORIES.LENDERS);

  const balance = useWalletBalance();
  const toast = useToast();

  const MIN_GAS_BALANCE: number = 0.01;

  const { depositETHLiquidity, depositStatus, txReceipt } =
    useDepositEthLiquidity();

  const [liquidityToDepositStr, setLiquidityToDepositStr] = useState('');

  const isInputBlank = liquidityToDepositStr === '';

  const isInputConvertibleToNumber = !Number.isNaN(
    Number(liquidityToDepositStr),
  );

  const doesInputExceedsMax = !!(
    isInputConvertibleToNumber &&
    balance &&
    Number(liquidityToDepositStr) > balance
  );

  const isDepositBtnDisabled =
    depositStatus !== 'READY' ||
    isInputBlank ||
    !isInputConvertibleToNumber ||
    doesInputExceedsMax;

  useEffect(() => {
    if (depositStatus === 'ERROR') {
      toast({
        title: 'There was an error when attempting to deposit liquidity.',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }
    if (depositStatus === 'SUCCESS' && txReceipt) {
      gaEventTracker(ACTIONS.LIQUIDITY, LABELS.DEPOSIT);
      toast({
        render: (props) => (
          <ToastSuccessCard
            title="Liquidity Deposited"
            txn={txReceipt}
            {...props}
          />
        ),
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [depositStatus, txReceipt]);

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
              textTransform="uppercase"
              onClick={() => {
                setLiquidityToDepositStr(
                  String(balance ? balance - MIN_GAS_BALANCE : 0),
                );
              }}
              disabled={depositStatus !== 'READY'}
            >
              max
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>

      {depositStatus === 'READY' &&
        (!isInputConvertibleToNumber || doesInputExceedsMax) && (
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
          status={depositStatus}
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
