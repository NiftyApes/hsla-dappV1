import { Button, Flex, Td, Text, Tr, useDisclosure } from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import Icon from 'components/atoms/Icon';
import React from 'react';

interface RowProps {
  ethLiquidity?: string;
}

const Row: React.FC<RowProps> = ({ ethLiquidity }) => {
  const {
    isOpen: isAddLiquidityModalOpen,
    onOpen: onAddLiqudityModalOpen,
    onClose: onAddLiqudityModalClose,
  } = useDisclosure();

  const {
    isOpen: isWithdrawLiquidityModalOpen,
    onOpen: onWithdrawLiqudityModalOpen,
    onClose: onWithdrawLiqudityModalClose,
  } = useDisclosure();

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
              {ethLiquidity}
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
              tbd
            </Text>
          </Flex>
        </Td>
        <Td>
          <Flex alignItems="center">
            <Button
              variant="link"
              color="primary.purple"
              fontSize="2.5xs"
              mr="18px"
              onClick={onWithdrawLiqudityModalOpen}
            >
              WITHDRAW
            </Button>
            <Button
              variant="neutralReverse"
              fontSize="2.5xs"
              px="30px"
              onClick={onAddLiqudityModalOpen}
            >
              ADD
            </Button>
          </Flex>
        </Td>
      </Tr>
    </>
  );
};

export default Row;
