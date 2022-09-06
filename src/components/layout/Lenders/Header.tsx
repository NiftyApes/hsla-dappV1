import React from 'react';
import { Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { useConnectWallet } from '@web3-onboard/react';

import { lendersIdDashboard, lendersIdLend, lendersIdLiquidity } from 'routes/router';
import WalletInfo from 'components/molecules/WalletInfo';

const Header: React.FC = () => {
  const [{ wallet }] = useConnectWallet();

  const walletAddress = wallet?.accounts[0].address;

  return (
    <Flex
      p="20px 15px 32px 20px"
      alignItems="center"
      justifyContent="space-between"
      top="0px"
      zIndex={9}
    >
      <Flex alignItems="center">
        <Link to="/">
          <Image src="/assets/images/header_logo.png" alt="Logo" mr="15px" cursor="pointer" />
        </Link>
        <Text textTransform="uppercase" fontSize="md" fontWeight="bold" mr="20px">
          Lenders
        </Text>
        <Flex
          bg="gray.300"
          borderRadius="45px"
          alignItems="center"
          columnGap="46px"
          fontSize="2.5xs"
          p="17px 26px"
          color="solid.gray0"
          fontWeight="bold"
        >
          <Link to={walletAddress ? lendersIdDashboard(walletAddress) : ''}>📊 DASH</Link>
          <Link to={walletAddress ? lendersIdLiquidity(walletAddress) : ''}>
            {' '}
            💧 MANAGE LIQUIDITY{' '}
          </Link>
          <Link to={walletAddress ? lendersIdLend(walletAddress) : ''}>📃 CREATE OFFERS</Link>
          {/*<Link to={walletAddress ? lendersIdOffers(walletAddress) : ''}>📃 CREATE OFFERS</Link>*/}
        </Flex>
        <Menu>
          <MenuButton as={Button} rightIcon={<AiOutlineCaretDown />} bg="transparent">
            BORROWERS
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
