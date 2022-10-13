import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

import WalletInfo from 'components/molecules/WalletInfo';
import {
  borrowers,
  borrowersDashboard,
  lendersDashboard,
  lendersLend,
  lendersLiquidity,
} from 'routes/router';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const navigateToLendersIdDashboard = useCallback(() => {
    navigate(lendersDashboard());
  }, [navigate]);

  const navigateToLendersIdLiquidity = useCallback(() => {
    navigate(lendersLiquidity());
  }, [navigate]);

  const navigateToLendersIdLend = useCallback(() => {
    navigate(lendersLend());
  }, [navigate]);

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
          <Image
            src="/assets/images/header_logo.png"
            alt="Logo"
            mr="15px"
            cursor="pointer"
          />
        </Link>
        <Text
          textTransform="uppercase"
          fontSize="md"
          fontWeight="bold"
          mr="20px"
        >
          Borrowers
        </Text>
        <Flex
          bg="gray.300"
          borderRadius="45px"
          alignItems="center"
          columnGap="46px"
          fontSize="md"
          textTransform="capitalize"
          p="17px 26px"
          fontWeight="bold"
        >
          <Text color="solid.gray0">
            <Link to={borrowersDashboard()}>📊 Dashboard</Link>
          </Text>
          <Text color="solid.gray0">
            <Link to={borrowers()}>🍌 Borrow</Link>
          </Text>
        </Flex>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<AiOutlineCaretDown />}
            bg="transparent"
          >
            LENDERS
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
            }}
          >
            <MenuItem onClick={navigateToLendersIdDashboard}>
              📊 Dashboard
            </MenuItem>
            <MenuItem onClick={navigateToLendersIdLiquidity}>
              💧 Manage Liquidity
            </MenuItem>
            <MenuItem onClick={navigateToLendersIdLend}>
              📜 Create Offers
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <WalletInfo />
    </Flex>
  );
};

export default Header;
