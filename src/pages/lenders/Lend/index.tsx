import React from 'react';
import { Box, Button, Flex, Grid, Input, Select, Text } from '@chakra-ui/react';

import Card from './Card';
import { COIN_SYMBOL_MAP } from 'lib/constants/coinSymbols';

const Lend: React.FC = () => {
  return (
    <Box p="20px">
      <Grid gridTemplateColumns="repeat(2, minmax(0, 1fr))" gridGap="20px">
        <Card>
          <Text fontSize="3xl">Deposit Liquidity</Text>
          <Box>
            <Text as="label">ERC20, Token Amt</Text>
            <Flex columnGap="20px">
              <Input type="number" />
              <Select borderColor="gray.100">
                <option value="">Select Coin</option>
                <option value={COIN_SYMBOL_MAP.dai.name}>{COIN_SYMBOL_MAP.dai.name}</option>
                <option value={COIN_SYMBOL_MAP.usdc.name}>{COIN_SYMBOL_MAP.usdc.name}</option>
              </Select>
              <Button variant="neutral" flexShrink={0}>
                Approve
              </Button>
              <Button variant="neutral" flexShrink={0}>
                Send
              </Button>
            </Flex>
          </Box>
          <Box>
            <Text as="label">cERC20, Token Amt</Text>
            <Flex columnGap="20px">
              <Input type="number" />
              <Button variant="neutral" flexShrink={0}>
                Approve
              </Button>
              <Button variant="neutral" flexShrink={0}>
                Send
              </Button>
            </Flex>
          </Box>
          <Box>
            <Text as="label">ETH, Amt</Text>
            <Flex columnGap="20px">
              <Input type="number" />
              <Button variant="neutral" flexShrink={0}>
                Send
              </Button>
            </Flex>
          </Box>
        </Card>
        <Card>
          <Text fontSize="3xl">Create Offer</Text>
          <Box>
            <Text as="label">Contract ID</Text>
            <Flex columnGap="20px">
              <Input />
              <Input />
            </Flex>
          </Box>
          <Box>
            <Text as="label">AMT</Text>
            <Flex columnGap="20px">
              <Input type="number" />
              <Select borderColor="gray.100">
                <option value="">Select Coin</option>
                <option value={COIN_SYMBOL_MAP.dai.name}>{COIN_SYMBOL_MAP.dai.name}</option>
                <option value={COIN_SYMBOL_MAP.usdc.name}>{COIN_SYMBOL_MAP.usdc.name}</option>
              </Select>
            </Flex>
          </Box>
          <Box>
            <Text as="label">APR</Text>
            <Input type="number" />
          </Box>
          <Box>
            <Text as="label">Duration</Text>
            <Input type="number" />
          </Box>
          <Box>
            <Text as="label">Expiration</Text>
            <Input type="number" defaultValue={30} />
          </Box>
          <Box textAlign="right">
            <Button variant="neutral">Create Offer</Button>
          </Box>
        </Card>
        <Card>
          <Text fontSize="3xl">Seize Asset</Text>
          <Box>
            <Text as="label">Contract ID</Text>
            <Input />
          </Box>
          <Box>
            <Text as="label">Token ID</Text>
            <Input />
          </Box>
          <Box textAlign="right">
            <Button variant="neutral">Seize Asset</Button>
          </Box>
        </Card>
      </Grid>
    </Box>
  );
};

export default Lend;
