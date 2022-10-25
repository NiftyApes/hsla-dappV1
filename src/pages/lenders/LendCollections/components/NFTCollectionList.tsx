import React, { useState } from 'react';
import {
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { useTopCollections } from '../../../../hooks/useTopCollections';
import NFTCollectionRow from './NFTCollectionRow';

const i18n = {
  inputButton: 'Go',
  inputHeader: 'NiftyApes Top Collections',
  inputPlaceholder: 'Paste Collection Address',
  thCollection: 'Collection',
  thFloor: 'Floor',
  thItems: 'Items',
  thOwners: 'Owners',
  thTotal: 'Total Vol',
};

const NFTCollectionList: React.FC<Props> = ({ onClick }) => {
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
        <Text fontSize="lg" fontWeight="bold">
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
            placeholder={i18n.inputPlaceholder}
            size="lg"
            bg="#F9F3FF"
            p="15px 25px"
            borderRadius="15px"
            h="auto"
            border="none"
            onChange={(event) => {
              setCollectionAddress(event.target.value);
            }}
          />
          <InputRightElement width="4.5rem" mt="5px">
            <Button
              size="sm"
              disabled={!isValidAddress}
              type="submit"
              variant="neutralReverse"
            >
              {i18n.inputButton}
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>{i18n.thCollection}</Th>
              <Th>{i18n.thFloor}</Th>
              <Th>{i18n.thTotal}</Th>
              <Th>{i18n.thOwners}</Th>
              <Th>{i18n.thItems}</Th>
            </Tr>
          </Thead>

          <Tbody>
            {collections.map((collection, idx) => {
              return (
                <NFTCollectionRow
                  key={collection.address}
                  collection={collection}
                  throttle={250 * idx}
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
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

interface Props {
  onClick?: () => void;
}

export default NFTCollectionList;
