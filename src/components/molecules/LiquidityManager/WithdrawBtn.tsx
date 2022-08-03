import { Button } from '@chakra-ui/react';

interface Props {
  isDisabled: boolean;
}

export const WithdrawBtn: React.FC<Props> = ({ isDisabled }) => {
  return (
    <Button isFullWidth mt="1rem" variant="neutralReverse" isDisabled={isDisabled}>
      Withdraw ETH
    </Button>
  );
};
