import { Box } from '@chakra-ui/react';

export const DepositMsg: React.FC = () => {
  return (
    <Box>
      <Box textAlign="center" mt="1rem">
        <strong>Why Lock Liquidity?</strong>
      </Box>
      <Box textAlign="center" mt="1rem">
        <span>
          Lock your funds in the NiftyApes Protocol to begin serving loans. When your funds aren't
          in active use, they're sent to <a href="https://compound.finance/">compound.finance</a>
        </span>
      </Box>
    </Box>
  );
};
