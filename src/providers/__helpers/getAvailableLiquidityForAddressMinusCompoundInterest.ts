/* eslint-disable */
import { ethers } from 'ethers';

export function getAvailableLiquidityForAddressMinusCompoundInterest(
  address: string,
  liquidityEvents: any,
) {
  return liquidityEvents
    .filter((e: any) => e.address === address)
    .reduce((total: number, event: any) => {
      if (event.type === 'ETH_SUPPLIED') {
        return total + event.amount;
      }

      if (event.type === 'ETH_WITHDRAWN') {
        return total - event.amount;
      }

      if (event.type === 'LOAN_MADE') {
        return (
          total -
          event.amount +
          (event.loan.hasBeenRepaid
            ? Number(
                ethers.utils.formatEther(
                  event.loan.repayLoanEvent.args.totalPayment,
                ),
              )
            : 0)
        );
      }

      throw Error('Unknown event type while adding up liquidity');
    }, 0);
}
