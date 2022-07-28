import React from 'react';
import { Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { useConnectWallet } from '@web3-onboard/react';

import { borrowersId, borrowersIdDashboard } from 'routes/router';
import WalletInfo from 'components/molecules/WalletInfo';

const Header: React.FC = () => {
  const [{ wallet }] = useConnectWallet();

  const walletAddress = wallet?.accounts[0].address;

  return (
    <Flex
      p="20px 15px 32px 20px"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top="0px"
      bg="gradient.primary"
      mr="20px"
      zIndex={9}
    >
      <Flex alignItems="center">
        <Link to="/">
          <Image src="/assets/images/header_logo.png" alt="Logo" mr="15px" cursor="pointer" />
        </Link>
        <Text textTransform="uppercase" fontSize="md" fontWeight="bold" mr="20px">
          Borrowers
        </Text>
        <Flex
          bg="gray.300"
          borderRadius="45px"
          alignItems="center"
          columnGap="46px"
          p="10px 26px"
          fontWeight="bold"
        >
          <Text textTransform="uppercase" fontSize="2.5xs">
            <Link to={borrowersId(walletAddress || '')}>🍌 Borrow</Link>
          </Text>
          <Text color="solid.gray0" fontSize="2.5xs">
            <Link to={walletAddress ? borrowersIdDashboard(walletAddress) : ''}>📊 DASH</Link>
          </Text>
        </Flex>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<AiOutlineCaretDown />}
            bg="transparent"
            textTransform="uppercase"
            color="solid.gray0"
            fontSize="md"
          >
            Lenders
          </MenuButton>
          <MenuList>
            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Manage Offers</MenuItem>
            <MenuItem>Manage Liquidity</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <WalletInfo />
    </Flex>
  );
};

export default Header;
