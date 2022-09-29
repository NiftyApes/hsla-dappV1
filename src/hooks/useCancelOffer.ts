import {useToast} from '@chakra-ui/toast';
import {updateOfferStatus} from 'api/updateOfferStatus';
import {useAppDispatch} from 'app/hooks';
import {increment} from 'counter/counterSlice';
import {ethers} from 'ethers';
import {useState} from 'react';
import {useOffersContract} from './useContracts';
import {useGetTransactionTimestamp} from './useGetTransactionTimestamp';

export const useCancelOffer = ({
                                   nftContractAddress,
                                   nftId,
                                   offerHash,
                               }: {
    nftContractAddress?: string;
    nftId: string;
    offerHash: string;
}) => {
    const niftyApesContract = useOffersContract();

    const dispatch = useAppDispatch();

    const {getTransactionTimestamp} = useGetTransactionTimestamp();

    const [cancelStatus, setCancelStatus] = useState<'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'>(
        'READY',
    );

    const [txObject, setTxObject] = useState<ethers.ContractTransaction | null>(null);

    const [txReceipt, setTxReceipt] = useState<ethers.ContractReceipt | null>(null);

    const toast = useToast();

    if (!niftyApesContract) {
        return {
            seizeAsset: undefined,
        };
    }

    return {
        cancelOffer: async () => {
            if (!nftContractAddress) {
                throw new Error('NFT Contract Address not specified');
            }

            setCancelStatus('PENDING');

            try {
                const offer = await niftyApesContract.getOffer(nftContractAddress, nftId, offerHash, true);

                const offerExpiration = offer.expiration;

                const tx = await niftyApesContract.removeOffer(nftContractAddress, nftId, offerHash, true);

                setTxObject(tx);

                const receipt: any = await tx.wait();

                const transactionTimestamp = await getTransactionTimestamp(receipt);

                setTxReceipt(receipt);

                setCancelStatus('SUCCESS');

                console.log(txObject)

                toast({
                    title: 'Offer canceled successfully',
                    status: 'success',
                    position: 'top-right',
                    isClosable: true,
                });

                await updateOfferStatus({
                    nftContractAddress,
                    nftId,
                    offerExpiration,
                    offerHash,
                    status: 'CANCELED',
                    transactionTimestamp,
                    transactionHash: receipt.transactionHash,
                });

                setTimeout(() => {
                    setCancelStatus('READY');
                    setTxObject(null);
                    setTxReceipt(null);
                }, 3000);
            } catch (e) {
                setCancelStatus('ERROR');

                setTimeout(() => {
                    setCancelStatus('READY');
                    setTxObject(null);
                    setTxReceipt(null);
                }, 3000);

                console.error(e);
            }

            dispatch(increment());
        },
        cancelStatus,
        txObject,
        txReceipt,
    };
};
