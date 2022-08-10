import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { DepositLiquidity } from './DepositLiquidity';
import { WithdrawLiquidity } from './WithdrawLiquidity';

export const LiquidityManager: React.FC = () => {
  return (
    <Box
      boxShadow="0px 0px 21px 0px #3A00831A"
      border="1px solid"
      borderColor="accents.100"
      bg="solid.white"
      borderRadius="1rem"
      pt="1rem"
      minWidth="248px"
      maxWidth="448px"
    >
      <Tabs isFitted variant="line" colorScheme="purple">
        <TabList pl="1rem" pr="1rem">
          <Tab padding="1.5rem">Deposit</Tab>
          <Tab padding="1.5rem">Withdraw</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DepositLiquidity />
          </TabPanel>
          <TabPanel>
            <WithdrawLiquidity />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
