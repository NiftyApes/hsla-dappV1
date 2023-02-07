import React, { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { LoanAuction } from 'loan';
import OffersTable from '../../../components/molecules/OffersTable';
import RolloverOffersTable from '../../../components/molecules/RolloverOffersTable';
import { LoanOffer } from '../../../loan/model/LoanOffer';

interface CallbackType {
  (offer: LoanOffer): void;
}

interface Props {
  offers: Array<LoanOffer>;
  onOfferSelect: CallbackType;
  actionLabel?: string;
  variant?: 'rollover' | 'offers';
  loan?: LoanAuction;
}

const Offers: React.FC<Props> = ({
  offers,
  onOfferSelect,
  actionLabel,
  variant = 'offers',
  loan,
}) => {
  const table = useMemo(() => {
    if (variant === 'rollover' && loan) {
      return (
        <RolloverOffersTable
          loan={loan}
          offers={Array.from(offers).sort(
            (a: LoanOffer, b: LoanOffer) =>
              b.interestRatePerSecond - a.interestRatePerSecond,
          )}
          onClick={onOfferSelect}
        />
      );
    }

    return (
      <OffersTable
        actionLabel={actionLabel}
        offers={Array.from(offers).sort(
          (a: LoanOffer, b: LoanOffer) =>
            b.interestRatePerSecond - a.interestRatePerSecond,
        )}
        onClick={onOfferSelect}
      />
    );
  }, [variant, loan, actionLabel, onOfferSelect, offers]);

  return (
    <Box p="5px" mb="5px">
      <Flex flexDir="column" alignItems="center">
        {table}
      </Flex>
    </Box>
  );
};

export default Offers;
