import { Button } from '@chakra-ui/react';

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

export const WithdrawBtn: React.FC<Props> = ({ isDisabled, onClick }) => {
  return (
    <Button
      isFullWidth
      mt="1rem"
      variant="neutralReverse"
      isDisabled={isDisabled}
      onClick={onClick}
    >
      Withdraw ETH
    </Button>
  );
};
