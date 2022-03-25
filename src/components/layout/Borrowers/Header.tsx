import React from 'react';
import { Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlineCaretDown } from 'react-icons/ai';

import { borrowersId, borrowersIdDashboard } from 'routes/router';
import WalletInfo from 'components/molecules/WalletInfo';

const MOCK_ID = '123';

const Header: React.FC = () => {
  return (
    <Flex
      p="20px 15px 32px 20px"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top="0px"
      bg="gradient.primary"
      zIndex={9}
    >
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
          fontWeight="bold"
        >
          <Text>
            <Link to={borrowersId(MOCK_ID)}>🍌 Borrow</Link>
          </Text>
          <Text color="solid.darkGray">
            <Link to={borrowersIdDashboard(MOCK_ID)}>📊 DASH</Link>
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
      <WalletInfo />
    </Flex>
  );
};

export default Header;
