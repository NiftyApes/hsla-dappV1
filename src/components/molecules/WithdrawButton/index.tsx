import React, { useEffect, useMemo } from 'react';
import { formatEther } from 'ethers/lib/utils';
import { Button, HStack, Text, useToast } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import { BigNumber } from 'ethers';
import { NFT } from '../../../nft';
import { roundForDisplay } from '../../../helpers/roundForDisplay';
import { useDrawLoanAmount } from '../../../hooks/useDrawLoanAmount';
import LoadingIndicator from '../../atoms/LoadingIndicator';
import { ToastSuccessCard } from '../../cards/ToastSuccessCard';

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
  const { drawEthFromLoan, status, txReceipt } = useDrawLoanAmount();
  const toast = useToast();

  const difference = useMemo(() => {
    return amount.sub(amountDrawn);
  }, [amount, amountDrawn]);

  useEffect(() => {
    if (status === 'ERROR') {
      toast({
        title: 'There was an error drawing down loan liquidity.',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }

    if (status === 'SUCCESS' && txReceipt) {
      toast({
        render: (props) => (
          <ToastSuccessCard title="Loan Drawn" txn={txReceipt} {...props} />
        ),
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [status]);

  if (difference.isZero()) return null;

  return (
    <Button
      onClick={() =>
        drawEthFromLoan({
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
      {status === 'PENDING' ? (
        <LoadingIndicator color="#12D196" size="xs" />
      ) : (
        <HStack spacing={1}>
          <Text>Get</Text>
          <Icon size={14} name="ether" />
          <Text ml={2}>{roundForDisplay(Number(formatEther(difference)))}</Text>
        </HStack>
      )}
    </Button>
  );
};

export default WithdrawButton;
