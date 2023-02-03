import { Button, HStack, Text } from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';
import Icon from 'components/atoms/Icon';
import { BigNumber } from 'ethers';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { useWithdrawEthLiquidity } from 'hooks/useWithdrawEthLiquidity';
import React, { useMemo } from 'react';

interface WithdrawButtonProps {
  amount: BigNumber;
  amountDrawn: BigNumber;
}

const WithdrawButton: React.FC<WithdrawButtonProps> = ({
  amount,
  amountDrawn,
}) => {
  const { withdrawETHLiquidity } = useWithdrawEthLiquidity();

  const difference = useMemo(() => {
    return Number(formatEther(amount)) - Number(formatEther(amountDrawn));
  }, [amount, amountDrawn]);

  if (!difference) return null;

  return (
    <Button
      onClick={() =>
        withdrawETHLiquidity({ ethToWithdraw: difference, cleanup: () => {} })
      }
      size="sm"
      top={3}
      right={2}
      position="absolute"
      backgroundColor="#00D46E"
      colorScheme="green"
      borderRadius={24}
    >
      <HStack>
        <Icon size={14} name="ether" />
        <Text>
          Get&nbsp;
          {roundForDisplay(difference)}
        </Text>
      </HStack>
    </Button>
  );
};

export default WithdrawButton;
