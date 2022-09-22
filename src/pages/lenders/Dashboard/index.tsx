import {Box, Center, Grid, GridItem, Text} from '@chakra-ui/react';
import React from 'react';

import {useActiveLoansForLender} from 'hooks/useActiveLoansForLender';
import {useOffersForLender} from 'hooks/useOffersOfLender';
import {useWalletAddress} from 'hooks/useWalletAddress';
import LoansTable from './LoansTable';
import OffersTable from './OffersTable';
import TopBar from './TopBar';

const Dashboard: React.FC = () => {

    const address = useWalletAddress();
    const offers = useOffersForLender({lenderAddress: address, onlyActive: false});

    const activeLoans = useActiveLoansForLender();

    return (
        <Box>
            <TopBar/>
            <Center px="36px">

                <Grid templateColumns="800px 700px" columnGap="24px">
                    <GridItem>
                        <Text fontWeight="bold" fontSize="lg" mb="8px">
                            Your Offers ({offers?.length})
                        </Text>

                        <OffersTable offers={offers}/>
                    </GridItem>

                    <GridItem>
                        <Text fontWeight="bold" fontSize="lg" mb="8px">
                            Your Loans ({activeLoans?.length})
                        </Text>
                        <LoansTable activeLoans={activeLoans}/>
                    </GridItem>
                </Grid>
            </Center>
        </Box>
    );
};

export default Dashboard;
