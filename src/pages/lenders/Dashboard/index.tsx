import {
    Box,
    Center,
    Grid,
    GridItem,
    Text,
} from '@chakra-ui/react';
import React from 'react';

import {useActiveLoansForLender} from 'hooks/useActiveLoansForLender';
import {useOffersForLender} from 'hooks/useOffersOfLender';
import {useWalletAddress} from 'hooks/useWalletAddress';
import LoansTable from './LoansTable';
import OffersTable from './OffersTable';
import TopBar from './TopBar';
import {EmptyPlaceholder} from "../../../components/cards/EmptyPlaceholder";

const i18n = {
    noLoans: "You don't have any active loans...",
    noOffers: "You don't have any active offers...",
}

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

                        {offers && offers.length === 0 &&
                            <EmptyPlaceholder>
                                <>
                                    {i18n.noOffers}
                                </>
                            </EmptyPlaceholder>
                        }

                        {offers && offers.length > 0 &&
                            <>
                                <Text fontWeight="bold" fontSize="lg" mb="8px">
                                    Your Offers ({offers?.length})
                                </Text>
                                <OffersTable offers={offers}/>
                            </>
                        }

                    </GridItem>

                    <GridItem>

                        {activeLoans && activeLoans.length === 0 &&
                            <EmptyPlaceholder>
                                <>{i18n.noLoans}</>
                            </EmptyPlaceholder>
                        }

                        {activeLoans && activeLoans.length > 0 &&
                            <>
                                <Text fontWeight="bold" fontSize="lg" mb="8px">
                                    Your Loans ({activeLoans?.length})
                                </Text>
                                <LoansTable activeLoans={activeLoans}/>
                            </>
                        }
                    </GridItem>
                </Grid>
            </Center>
        </Box>
    );
};

export default Dashboard;
