import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  GridItem,
  Input,
  Text,
} from '@chakra-ui/react';

const CreateCollectionOffer: React.FC = () => {
  return (
    <Box
      border="1px solid #EAD9FF"
      borderRadius="10px"
      px="19px"
      py="11px"
      bg="solid.white"
      boxShadow="0px 4px 24px 0px #4910921A"
    >
      <Text
        bg="#f7f7f7"
        borderRadius="8px"
        fontSize="sm"
        fontWeight="bold"
        py="9px"
        textAlign="center"
        color="solid.gray0"
      >
        HOW MUCH?
      </Text>
      <Grid gridTemplateColumns="repeat(3, minmax(0, 1fr))" my="18px" alignItems="center">
        <GridItem colSpan={2}>
          <Input
            bg="#F9F3FF"
            py="15px"
            paddingLeft="140px"
            paddingRight="25px"
            borderRadius="20px"
            fontSize="3xl"
            h="auto"
            border="none"
            defaultValue="0.0000"
          />
        </GridItem>
        <GridItem colSpan={1} textAlign="center">
          <Text fontSize="md" fontWeight="bold" mb="6px">
            LTV
          </Text>
          <CircularProgress
            value={40}
            color="notification.notify"
            trackColor="notification.info"
            size="66px"
          >
            <CircularProgressLabel fontSize="sm" fontWeight="bold">
              21.0%
            </CircularProgressLabel>
          </CircularProgress>
          <Text fontSize="sm" fontWeight="bold" color="solid.gray0" mt="6px">
            100Ξ Floor
          </Text>
        </GridItem>
      </Grid>
      <Text
        bg="#f7f7f7"
        borderRadius="8px"
        fontSize="sm"
        fontWeight="bold"
        py="9px"
        textAlign="center"
        color="solid.gray0"
      >
        What APR and For How Long?
      </Text>
      <Grid gridTemplateColumns="repeat(2, minmax(0, 1fr))" px="6px" columnGap="28px" mt="12px">
        <GridItem>
          <Text fontSize="sm" textAlign="center" mb="12px" fontWeight="bold">
            APR
          </Text>
          <Box position="relative">
            <Input
              bg="#F9F3FF"
              p="15px 25px"
              borderRadius="20px"
              fontSize="3xl"
              h="auto"
              border="none"
              defaultValue="0.0000"
            />
            <Text
              fontSize="11px"
              position="absolute"
              bottom="15px"
              right="25px"
              color="solid.gray0"
            >
              %
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" textAlign="center" mb="12px" fontWeight="bold">
            DURATION
          </Text>
          <Box position="relative">
            <Input
              bg="#F9F3FF"
              p="15px 25px"
              borderRadius="20px"
              fontSize="3xl"
              h="auto"
              border="none"
              defaultValue="120"
            />
            <Text
              fontSize="11px"
              position="absolute"
              bottom="15px"
              right="25px"
              color="solid.gray0"
            >
              DAYS
            </Text>
          </Box>
        </GridItem>
      </Grid>
      <Button
        variant="neutralReverse"
        py="25px"
        borderRadius="15px"
        fontSize="sm"
        w="100%"
        mt="40px"
      >
        CREATE OFFER
      </Button>
      <Text textAlign="center" bg="#f7f7f7" py="10px" borderRadius="8px" mt="11px">
        Offer Will Expire in{' '}
        <Text as="span" color="primary.purple">
          30 Days
        </Text>
      </Text>
    </Box>
  );
};

export default CreateCollectionOffer;
