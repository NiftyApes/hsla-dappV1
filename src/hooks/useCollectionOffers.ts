import {getOffersByCollection} from 'api/getOffersByCollection';
import {useAppSelector} from 'app/hooks';
import {RootState} from 'app/store';
import {getLoanOfferFromHash} from 'helpers/getLoanOfferFromHash';
import _ from 'lodash';
import {useEffect, useState} from 'react';
import {useChainId} from './useChainId';
import {useOffersContract} from './useContracts';
import {useWalletAddress} from "./useWalletAddress";

export const useCollectionOffers = ({nftContractAddress}: { nftContractAddress?: string }) => {
    const [offers, setOffers] = useState<any>();

    const cacheCounter = useAppSelector((state: RootState) => state.counter);
    const niftyApesContract = useOffersContract();

    const walletAddress = useWalletAddress();
    const chainId = useChainId();

    useEffect(() => {
        async function fetchLoanOffersForNFT() {

            if (!niftyApesContract || !nftContractAddress) {
                return;
            }

            const offers = await getOffersByCollection({chainId, nftContractAddress});

            //Don't load on-chain offers for disconnected wallets
            if (walletAddress) {
                for (let i = 0; i < offers.length; i++) {
                    const offerHash = offers[i].offerHash;

                    const offerFromChain = await getLoanOfferFromHash({
                        offersContract: niftyApesContract,
                        nftContractAddress,
                        // all collection offers have nftId 0
                        nftId: '0',
                        offerHash,
                        floorTerm: offers[i].offer.floorTerm,
                    });

                    if (!offerFromChain || offerFromChain[0] === '0x0000000000000000000000000000000000000000') {
                        offers[i] = undefined;
                    }
                }
            }

            const filteredOffers = _.compact(offers);

            setOffers(filteredOffers);
        }

        fetchLoanOffersForNFT();
    }, [nftContractAddress, niftyApesContract, chainId, cacheCounter]);

    if (!offers) {
        return undefined;
    }

    // sort by createdAt, but components that use this hook, like OfferBook
    // probably have their own sorting method
    return _.sortBy(offers, (o) => -o.offer.expiration).map((o) => o.offer);
};
