import React from "react";
import {Text, CloseButton, Box, Link} from '@chakra-ui/react';
import {TransactionReceipt} from "@ethersproject/abstract-provider";

export const ToastSuccessCard: React.FC<{
    onClose: { (): void },
    title: string,
    txn?: TransactionReceipt,
}> = ({
          onClose,
          title,
          txn,
      }) => {
    return <Box color='white' p={5} rounded="md" boxShadow='lg' bg="green.400">

        <CloseButton
            float={'right'}
            top={-1}
            onClick={onClose}
        />

        <Text fontSize="xl" fontWeight="bold" as={'div'}>{title}</Text>
        {txn && <Link href={`https://etherscan.io/tx/${txn.transactionHash}`} target="_blank">View on Etherscan</Link>}
    </Box>
}