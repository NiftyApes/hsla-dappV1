import { Box } from '@chakra-ui/react';

export const WithdrawMsg: React.FC = () => {
  return (
    <Box>
      <Box textAlign="center" mt="1rem">
        <strong>How Much Can I Withdraw?</strong>
      </Box>
      <Box textAlign="center" mt="1rem">
        <span>
          You can withdraw all of your <strong>available liquidity.</strong> <br /> Any liquidity that is
          being used for an active loan cannot be withdrawn (it's earning you
          interest in your loans)!
        </span>
      </Box>
    </Box>
  );
};
