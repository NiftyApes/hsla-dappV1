import React from 'react';
import { Flex, Grid, Td, Tr, Image, Text, Badge } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';

const Row: React.FC = () => {
  return (
    <Tr
      sx={{
        td: {
          borderBottom: 'none',
        },
      }}
    >
      <Td px="10px">
        <Badge borderRadius="50%" p="5px" bgColor="notification.info">
          <Icon name="update" size={12} color="solid.white" />
        </Badge>
      </Td>
      <Td px="10px">
        <Flex>
          <Image src="/assets/mocks/bored_ape_square.png" borderRadius="3px" flexShrink={0} />
          <Grid gap="3px" ml="-10px" flexShrink={0}>
            <Image src="/assets/images/etherscan.png" />
            <Image src="/assets/images/os.png" />
          </Grid>
        </Flex>
      </Td>
      <Td>
        <Text fontSize="md" color="notification.notify" fontWeight="bold">
          New Loan Initiated
        </Text>
      </Td>
      <Td>
        <Text textTransform="uppercase" color="solid.gray0" fontSize="sm">
          Terms
          <br />
          <Text as="span" color="solid.black" fontWeight="bold">
            37.5Ξ&nbsp;
          </Text>
          Received 120 Days,{' '}
          <Text as="span" color="solid.black" fontWeight="bold">
            52%&nbsp;
          </Text>{' '}
          APR
        </Text>
      </Td>
      <Td>
        <Text fontSize="sm" textTransform="uppercase" textDecor="underline" color="solid.gray0">
          [ timestamp ]
        </Text>
      </Td>
    </Tr>
  );
};

export default Row;
