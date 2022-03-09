import React from 'react';
import { Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlineCaretDown } from 'react-icons/ai';
import Icon from 'components/atoms/Icon';

const Header: React.FC = () => {
  return (
    <Flex p="20px 15px 32px 20px" alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <Image src="/assets/images/header_logo.png" alt="Logo" mr="15px" />
        <Text textTransform="uppercase" fontSize="md" fontWeight="bold" mr="20px">
          Borrowers
        </Text>
        <Flex
          bg="gray.300"
          borderRadius="45px"
          alignItems="center"
          columnGap="46px"
          fontSize="2.5xs"
          p="17px 26px"
        >
          <Text>
            <Link to="">🍌 Borrow</Link>
          </Text>
          <Text color="darkGray">
            <Link to="">📊 DASH</Link>
          </Text>
        </Flex>
        <Menu>
          <MenuButton as={Button} rightIcon={<AiOutlineCaretDown />} bg="transparent">
            LENDERS
          </MenuButton>
          <MenuList>
            <MenuItem>Sample</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Flex alignItems="center">
        <Flex
          bg="gray.300"
          borderRadius="40px"
          fontSize="2md"
          fontWeight="bold"
          alignItems="center"
        >
          <Text color="darkGray" m="11px 14px 11px 18px">
            00.0157Ξ
          </Text>
          <Button variant="primary" borderRadius="40px">
            <Text mr="12px" p="6px 0px 6px 18px">
              0xEc01...3510
            </Text>
            <Image
              src="/assets/images/wallet_address_indicator.png"
              alt="Logo"
              p="8px 6px 8px 0px"
            />
          </Button>
        </Flex>
        <Button variant="primary" borderRadius="50%" p="11px" ml="6px">
          <Icon name="menu" />
        </Button>
        <Button variant="primary" borderRadius="50%" p="11px" ml="9px">
          <Icon name="notification" color="primary.purple" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
