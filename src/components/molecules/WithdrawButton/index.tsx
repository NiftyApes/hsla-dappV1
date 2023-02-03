import { formatEther } from 'ethers/lib/utils';
import { Button, HStack, Text } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import { BigNumber } from 'ethers';
import React, { useMemo } from 'react';
import { useDrawLoanAmount } from '../../../hooks/useDrawLoanAmount';
import { NFT } from '../../../nft';
import { roundForDisplay } from '../../../helpers/roundForDisplay';

interface WithdrawButtonProps {
  amount: BigNumber;
  amountDrawn: BigNumber;
  nft: NFT;
}

const WithdrawButton: React.FC<WithdrawButtonProps> = ({
  amount,
  amountDrawn,
  nft,
}) => {
  const { withdrawETH } = useDrawLoanAmount();

  const difference = useMemo(() => {
    return amount.sub(amountDrawn);
  }, [amount, amountDrawn]);

  if (difference.isZero()) return null;

  return (
    <Button
      onClick={() =>
        withdrawETH({
          cleanup: () => {},
          ethToWithdraw: difference,
          nftContractAddress: nft.contractAddress,
          nftId: nft.id,
        })
      }
      size="sm"
      top={3}
      right={2}
      position="absolute"
      backgroundColor="#00D46E"
      colorScheme="green"
      borderRadius={24}
    >
      <HStack spacing={1}>
        <Text>Get</Text>
        <Icon size={14} name="ether" />
        <Text ml={2}>{roundForDisplay(Number(formatEther(difference)))}</Text>
      </HStack>
    </Button>
  );
};

export default WithdrawButton;
