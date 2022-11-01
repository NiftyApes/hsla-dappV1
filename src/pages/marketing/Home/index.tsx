import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, VStack, Center, HStack, Link } from '@chakra-ui/react';
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
    <Center>
      <VStack>
        <Box
          as="video"
          autoPlay
          muted
          loop
          src="https://player.vimeo.com/progressive_redirect/playback/765898999/rendition/540p/file.mp4?loc=external&signature=da3708e52559884c56cb461e6074ff7bbae048fe1739d5198214680336c56c28"
          w="600px"
        />

        <HStack spacing={5} mt="400px">
          <VStack>
            <Button
              borderRadius="8px"
              colorScheme="purple"
              onClick={handleStartBorrowingClick}
              py="6px"
              size="lg"
              textTransform="uppercase"
              variant="outline"
              w="250px"
            >
              Start Borrowing
            </Button>
            <Link
              href="https://docs.niftyapes.money/borrowers-dapp-guide/borrow-page"
              target="_blank"
            >
              Borrower Quick Start
            </Link>
          </VStack>
          <VStack>
            <Button
              borderRadius="8px"
              colorScheme="purple"
              onClick={handleStartLendingClick}
              py="6px"
              size="lg"
              textTransform="uppercase"
              variant="outline"
              w="250px"
            >
              Start Lending
            </Button>
            <Link
              href="https://docs.niftyapes.money/lenders-dapp-guide/lender-quick-start-guide"
              target="_blank"
            >
              Lender Quick Start
            </Link>
          </VStack>
        </HStack>
      </VStack>
    </Center>
  );
};

export default Home;
