import { Button } from '@chakra-ui/react';
import LoadingIndicator from '../../atoms/LoadingIndicator';

interface Props {
  isDisabled: boolean;
  onClick: () => void;
  status: string;
}

export const WithdrawBtn: React.FC<Props> = ({
  isDisabled,
  onClick,
  status,
}) => {
  return (
    <Button
      width="100%"
      mt="1rem"
      variant="neutralReverse"
      isDisabled={isDisabled}
      onClick={onClick}
    >
      {status === 'PENDING' ? <LoadingIndicator size="xs" /> : 'Withdraw ETH'}
    </Button>
  );
};
