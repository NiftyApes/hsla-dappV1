import { Button } from '@chakra-ui/react';

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

export const DepositBtn: React.FC<Props> = ({ isDisabled, onClick }) => {
  return (
    <Button
      width="100%"
      mt="1rem"
      variant="neutralReverse"
      isDisabled={isDisabled}
      onClick={onClick}
    >
      Deposit ETH
    </Button>
  );
};
