import React from 'react';
import { Button, Flex, Image, Text } from '@chakra-ui/react';

type Props = {
  title: string;
  desc: string;
  img?: string;
  onReadMore?: () => void;
};

const Step: React.FC<Props> = ({ title, desc, img, onReadMore }) => {
  return (
    <Flex w="230px" flexDir="column" alignItems="center">
      {img ? (
        <Image src={img} alt="Step" w="200px" h="200px" borderRadius="50%" objectFit="cover" />
      ) : (
        <Flex
          w="200px"
          h="200px"
          borderRadius="50%"
          justifyContent="center"
          alignItems="center"
          bg="rgba(196, 196, 196, 0.3)"
          fontStyle="italic"
          fontSize="md"
        >
          Illustration
        </Flex>
      )}
      <Text mt="25px" fontWeight="bold" fontSize="sm">
        {title}
      </Text>
      <Text mt="21px" fontWeight="normal" fontSize="sm" color="solid.gray0">
        {desc}
      </Text>
      <Button
        variant="link"
        color="primary.purple"
        fontSize="sm"
        fontWeight="normal"
        onClick={onReadMore}
      >
        Read More
      </Button>
    </Flex>
  );
};

export default Step;
