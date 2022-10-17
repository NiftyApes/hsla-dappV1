import React, { useState } from 'react';
import {
  Center,
  Flex,
  Input,
  InputGroup,
  Stack,
  Text,
  Button,
  InputRightElement,
} from '@chakra-ui/react';

import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import NFTCollectionCard from '../../../components/cards/NFTCollectionCard';
import { useTopCollections } from '../../../hooks/useTopCollections';

const i18n = {
  inputHeader: 'select a collection',
  inputPlaceholder: 'Collection Contract Address',
  inputButton: 'Go',
};

interface Props {
  onClick?: () => void;
}

const LendCollections: React.FC<Props> = ({ onClick }) => {
  const navigate = useNavigate();
  const { collections } = useTopCollections();
  const [collectionAddress, setCollectionAddress] = useState('');
  const isValidAddress = ethers.utils.isAddress(collectionAddress);

  const onNavigate = () => {
    if (isValidAddress) {
      navigate(`/lenders/create-collection-offer/${collectionAddress}`);
    }
  };

  return (
    <Stack direction="column" spacing="24px" p="15px">
      <Center>
        <Text textTransform="uppercase" fontSize="lg" fontWeight="bold">
          {i18n.inputHeader}
        </Text>
      </Center>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onNavigate();
        }}
      >
        <InputGroup size="lg">
          <Input
            variant="filled"
            placeholder={i18n.inputPlaceholder}
            size="lg"
            onChange={(event) => {
              setCollectionAddress(event.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button size="sm" disabled={!isValidAddress} type="submit">
              {i18n.inputButton}
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>

      <Flex direction="column">
        {collections.map((collection, index) => {
          return (
            <NFTCollectionCard
              collection={collection}
              throttle={100 * index}
              onClick={() => {
                navigate(
                  `/lenders/create-collection-offer/${collection.address}`,
                );
                if (onClick) {
                  onClick();
                }
              }}
            />
          );
        })}
      </Flex>
    </Stack>
  );
};

export default LendCollections;
