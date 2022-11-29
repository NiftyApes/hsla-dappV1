import React from 'react';
import {
  Flex,
  FormControl,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Link as ChakraLink,
  Image,
} from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';

type TokenControlProps = {
  fetchedNFT: Record<string, any>;
  tokenId: string;
  setTokenId: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
};

const TokenControl: React.FC<TokenControlProps> = ({
  fetchedNFT,
  tokenId,
  setTokenId,
  disabled,
}) => (
  <Grid
    gridTemplateColumns="repeat(3, minmax(0, 1fr))"
    my="18px"
    alignItems="center"
  >
    <GridItem colSpan={2}>
      <FormControl>
        <InputGroup>
          <InputLeftElement sx={{ top: '17px', left: '16px', width: '3.5rem' }}>
            <Image
              borderRadius="8"
              style={{ height: '3.5rem', width: '3.5rem' }}
              mr=".75rem"
              src={
                (tokenId && fetchedNFT?.image) ||
                '/assets/images/img-missing.png'
              }
            />
          </InputLeftElement>
          <Input
            placeholder="Token ID"
            _placeholder={{
              fontSize: 26,
              transform: 'translateY(-2px)',
              fontWeight: 'bold',
            }}
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            textAlign="left"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            bg="#F9F3FF"
            p="15px 25px 15px 75px"
            borderRadius="20px"
            fontSize="3xl"
            h="auto"
            border="none"
            disabled={disabled}
          />
        </InputGroup>
      </FormControl>
    </GridItem>
    <GridItem colSpan={1} textAlign="center" opacity={0.75}>
      <Flex ml="5" flexDirection="column">
        <Flex>
          <Icon name="etherscan" mr="5px" ml="3px" />
          <ChakraLink
            href={tokenId && fetchedNFT?.external_url}
            target="_blank"
          >
            Etherscan
          </ChakraLink>
        </Flex>
        <Flex>
          <Icon name="os" size={23} mr="3px" />
          <ChakraLink
            href={
              tokenId &&
              `https://opensea.io/assets/ethereum/${fetchedNFT.contractAddress}/${fetchedNFT.id}`
            }
            target="_blank"
          >
            OpenSea
          </ChakraLink>
        </Flex>
      </Flex>
    </GridItem>
  </Grid>
);

export default TokenControl;
