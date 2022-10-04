import { Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

import WalletInfo from 'components/molecules/WalletInfo';
import {
  borrowers,
  borrowersDashboard,
  lendersDashboard,
  lendersLend,
  lendersLiquidity
} from 'routes/router';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const navigateToBorrowersDashboard = useCallback(() => {
    navigate(borrowersDashboard());
  }, [navigate]);

  const navigateToBorrowers = useCallback(() => {
    navigate(borrowers());
  }, [navigate]);

  return (
    <Flex
      p="20px 15px 32px 20px"
      alignItems="center"
      justifyContent="space-between"
      top="0px"
      zIndex={9}>
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
          p="17px 26px"
          color="solid.gray0"
          fontWeight="bold"
          fontSize="md"
          textTransform={"capitalize"}
        >
          <Link to={lendersDashboard()}>📊 Dashboard</Link>
          <Link to={lendersLiquidity()}>💧 Manage Liquidity </Link>
          <Link to={lendersLend()}>📃 Create Offers</Link>
        </Flex>
        <Menu key={window.location.pathname}>
          <MenuButton as={Button} rightIcon={<AiOutlineCaretDown />} bg="transparent">
            BORROWERS
          </MenuButton>
          <MenuList
            borderRadius="15px"
            boxShadow="0px 0px 21px rgba(58, 0, 131, 0.1)"
            p="9px 7px"
            fontSize="md"
            sx={{
              button: {
                fontWeight: 'bold',
                borderRadius: '10px',
                p: '15px',
              },
            }}>
            <MenuItem onClick={navigateToBorrowersDashboard}>📊 Dashboard</MenuItem>
            <MenuItem onClick={navigateToBorrowers}>🍌 Borrow</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <WalletInfo />
    </Flex>
  );
};

export default Header;
