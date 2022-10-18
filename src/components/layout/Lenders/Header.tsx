import {
  Button,
  Flex,
  Hide,
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
  lenders,
  lendersDashboard,
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
    navigate(lenders());
  }, [navigate]);

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

        <Hide below="md">
          <Text
            textTransform="uppercase"
            fontWeight="bold"
            mr="20px"
            noOfLines={1}
            fontSize={{ base: '14px', xl: '16px' }}
          >
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
            fontSize={{ base: '14px', xl: '16px' }}
            textTransform="capitalize"
          >
            <Text whiteSpace="nowrap">
              <Link to={lendersDashboard()}>📊 Dashboard</Link>
            </Text>
            <Text whiteSpace="nowrap">
              <Link to={lendersLiquidity()}>💧 Manage Liquidity </Link>
            </Text>
            <Text whiteSpace="nowrap">
              <Link to={lenders()}>📃 Create Offers</Link>
            </Text>
          </Flex>
        </Hide>
        <Hide above="md">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<AiOutlineCaretDown />}
              bg="transparent"
              noOfLines={1}
              fontSize={{ base: '14px', xl: '16px' }}
            >
              LENDERS
            </MenuButton>
            <MenuList
              borderRadius="15px"
              boxShadow="0px 0px 21px rgba(58, 0, 131, 0.1)"
              p="9px 7px"
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
        </Hide>
        <Menu key={window.location.pathname}>
          <MenuButton
            as={Button}
            rightIcon={<AiOutlineCaretDown />}
            bg="transparent"
            noOfLines={1}
            fontSize={{ base: '14px', xl: '16px' }}
          >
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
            }}
          >
            <MenuItem onClick={navigateToBorrowersDashboard}>
              📊 Dashboard
            </MenuItem>
            <MenuItem onClick={navigateToBorrowers}>🍌 Borrow</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <WalletInfo />
    </Flex>
  );
};

export default Header;
