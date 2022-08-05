import { Box, Link } from '@chakra-ui/react';

export const DepositMsg: React.FC = () => {
  return (
    <Box>
      <Box textAlign="center" mt="1rem">
        <strong>Why Lock Liquidity?</strong>
      </Box>
      <Box textAlign="center" mt="1rem">
        <span>
          Lock your funds in the NiftyApes Protocol to begin serving loans. When your funds aren't
          in active use, they're locked in{' '}
          <Link color="purple" href="https://compound.finance/" isExternal>
            Compound
          </Link>
        </span>
      </Box>
    </Box>
  );
};
