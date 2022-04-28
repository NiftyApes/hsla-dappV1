import { Button, Flex, Td, Text, Tr, useDisclosure } from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import Icon from 'components/atoms/Icon';
import React from 'react';
import AddLiquidityModal from '../AddLiquidityModal';

const Row: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tr
        sx={{
          td: {
            border: 'none',
            fontSize: 'md',
          },
        }}
      >
        <Td>
          <Flex alignItems="center">
            <CryptoIcon symbol="eth" size={25} />
            <Text fontSize="xl" ml="8px">
              340.352..Ξ
            </Text>
          </Flex>
        </Td>
        <Td>
          <Flex alignItems="center">
            <Flex
              w="25px"
              h="25px"
              justifyContent="center"
              alignItems="center"
              bg="#baccff"
              borderRadius="50%"
            >
              <Icon name="lock" size={14} color="solid.white" />
            </Flex>
            <Text fontSize="xl" ml="8px">
              20.22Ξ
            </Text>
          </Flex>
        </Td>
        <Td>
          <Flex alignItems="center">
            <Button variant="link" color="primary.purple" fontSize="2.5xs" mr="18px">
              WITHDRAW
            </Button>
            <Button variant="neutralReverse" fontSize="2.5xs" px="30px" onClick={onOpen}>
              ADD
            </Button>
          </Flex>
        </Td>
      </Tr>
      <AddLiquidityModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Row;
