import { Button } from '@chakra-ui/react';

interface Props {
  isDisabled: boolean;
}

export const DepositBtn: React.FC<Props> = ({ isDisabled }) => {
  return (
    <Button isFullWidth mt="1rem" variant="neutralReverse" isDisabled={isDisabled}>
      Deposit ETH
    </Button>
  );
};
