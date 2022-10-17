import { Box, Link } from '@chakra-ui/react';

export const DepositMsg: React.FC = () => {
  return (
    <Box>
      <Box textAlign="center" mt="1rem">
        <strong>Why Deposit Liquidity?</strong>
      </Box>
      <Box textAlign="center" mt="1rem">
        <span>
          Deposit funds to begin serving loans. When your funds aren't being
          used in a loan, they're earning interest in{' '}
          <Link color="purple" href="https://compound.finance/" isExternal>
            Compound
          </Link>
          .
        </span>
      </Box>
    </Box>
  );
};
