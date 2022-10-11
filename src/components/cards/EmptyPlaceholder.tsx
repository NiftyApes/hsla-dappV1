import React from 'react';
import {Flex} from '@chakra-ui/react';

export const EmptyPlaceholder: React.FC<{ children: JSX.Element }> = ({children}) => {

    return <Flex
        borderRadius="8px"
        border="1px solid"
        borderColor="accents.100"
        bg="#C4C4C41A"
        p="10px"
        w="100%"
        mt="8px"
        mb="8px"
    >
        {children}
    </Flex>
}