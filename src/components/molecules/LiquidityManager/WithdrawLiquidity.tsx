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
import { useEffect, useState } from 'react';
import { useWithdrawEthLiquidity } from 'hooks/useWithdrawEthLiquidity';
import { useAnalyticsEventTracker } from 'hooks/useAnalyticsEventTracker';
import { ACTIONS, CATEGORIES, LABELS } from 'constants/googleAnalytics';
import { ToastSuccessCard } from '../../cards/ToastSuccessCard';
import { WithdrawBtn } from './WithdrawBtn';
import { WithdrawMsg } from './WithdrawMsg';

export const WithdrawLiquidity: React.FC = () => {
  const gaEventTracker = useAnalyticsEventTracker(CATEGORIES.LENDERS);
  const toast = useToast();

  const {
    withdrawETHLiquidity,
    withdrawStatus,
    txReceipt,
    availableEthLiquidity,
  } = useWithdrawEthLiquidity();

  const [liquidityToWithdrawStr, setLiquidityToWithdrawStr] = useState('');

  const isInputBlank = liquidityToWithdrawStr === '';

  const isInputConvertibleToNumber = !Number.isNaN(
    Number(liquidityToWithdrawStr),
  );

  const doesInputExceedsMax = !!(
    isInputConvertibleToNumber &&
    availableEthLiquidity &&
    Number(liquidityToWithdrawStr) > availableEthLiquidity
  );

  const isWithdrawBtnDisabled =
    withdrawStatus !== 'READY' ||
    isInputBlank ||
    !isInputConvertibleToNumber ||
    doesInputExceedsMax;

  useEffect(() => {
    if (withdrawStatus === 'ERROR') {
      toast({
        title: 'There was an error when attempting to withdraw liquidity.',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }
    if (withdrawStatus === 'SUCCESS' && txReceipt) {
      gaEventTracker(ACTIONS.LIQUIDITY, LABELS.WITHDRAW);
      toast({
        render: (props) => (
          <ToastSuccessCard
            title="Liquidity Withdrawn"
            txn={txReceipt}
            {...props}
          />
        ),
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [withdrawStatus, txReceipt]);

  return (
    <div>
      <Flex>
        <InputGroup size="md">
          <InputLeftElement m=".25rem">
            <CryptoIcon symbol="eth" size={25} />
          </InputLeftElement>
          <Input
            size="lg"
            type="number"
            pr="4.5rem"
            value={liquidityToWithdrawStr}
            onChange={(e) => setLiquidityToWithdrawStr(e.target.value)}
          />
          <InputRightElement width="5.5rem">
            <Button
              colorScheme="purple"
              variant="link"
              size="lg"
              pt=".5rem"
              textTransform="uppercase"
              onClick={() =>
                availableEthLiquidity &&
                setLiquidityToWithdrawStr(String(availableEthLiquidity))
              }
            >
              max
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      {withdrawStatus === 'READY' &&
        (!isInputConvertibleToNumber || doesInputExceedsMax) && (
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
          status={withdrawStatus}
          onClick={() => {
            withdrawETHLiquidity({
              ethToWithdraw: Number(liquidityToWithdrawStr),
              cleanup: () => setLiquidityToWithdrawStr(''),
            });
          }}
          isDisabled={isWithdrawBtnDisabled}
        />
      </Flex>
      <WithdrawMsg />
    </div>
  );
};
