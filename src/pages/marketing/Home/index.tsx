import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';

import { borrowers, lenders } from 'routes/router';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartBorrowingClick = () => {
    navigate(borrowers());
  };

  const handleStartLendingClick = () => {
    navigate(lenders());
  };

  return (
    <Flex h="100%" justifyContent="center" alignItems="center">
      <Button mr="10px" onClick={handleStartBorrowingClick}>
        Start Borrowing
      </Button>
      <Button onClick={handleStartLendingClick}>Start Lending</Button>
    </Flex>
  );
};

export default Home;
