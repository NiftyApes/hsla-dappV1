import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import CryptoIcon from 'components/atoms/CryptoIcon';

const Collection: React.FC = () => {
  return (
    <Box
      borderRadius="18px"
      p="7px"
      boxShadow="0px 2.87612px 17.2567px rgba(73, 16, 146, 0.1)"
      w="250px"
    >
      <Flex textAlign="center" alignItems="center" justifyContent="center" mb="7px">
        <Text fontSize="sm" fontWeight="bold" isTruncated>
          BORED APE YACHT CLU.
        </Text>
        <Icon name="etherscan" size={18} mx="3px" />
        <Icon name="os" size={21} />
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="space-around"
        sx={{
          '& > p': {
            fontSize: 'xs',
            color: 'primary.purple',
          },
        }}
      >
        <Text>10k in Collection</Text>|<Text>34 Requests</Text>
      </Flex>

      <Image src="/assets/mocks/bored_ape_border.png" alt="Collection" m="0 auto" mt="10px" />

      <Box border="1px solid #F2E5FF" p="12px 10px" borderRadius="15px" mt="-35px">
        <Flex justifyContent="center" alignItems="center" mt="30px">
          <CryptoIcon symbol="eth" size={24} />
          <Text fontSize="3xl" mx="6px">
            100.Ξ
          </Text>
          <Text fontSize="2xs" color="solid.gray0">
            Floor
          </Text>
        </Flex>
        <Flex
          mt="18px"
          justifyContent="space-between"
          sx={{
            '& > div': {
              textAlign: 'center',
              'p:first-of-type': {
                fontSize: 'xl',
              },
              'p:nth-child(2)': {
                fontSize: '2xs',
                color: 'solid.gray0',
              },
            },
          }}
        >
          <Flex flexDir="column" alignItems="center">
            <Text>5,4305</Text>
            <Text>Active</Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Text>43Ξ</Text>
            <Text>Loan Amt</Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Text>54%</Text>
            <Text>Av. APR</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Collection;
