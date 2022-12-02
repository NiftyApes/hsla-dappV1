import { Box, CloseButton, Text } from '@chakra-ui/react';
import React from 'react';

export const NonTxnToastSuccessCard: React.FC<{
  onClose: { (): void };
  title: string;
}> = ({ onClose, title }) => {
  return (
    <Box color="white" p={5} rounded="md" boxShadow="lg" bg="green.400">
      <CloseButton float="right" top={-1} onClick={onClose} />

      <Text fontSize="xl" fontWeight="bold" as="div">
        {title}
      </Text>
    </Box>
  );
};
