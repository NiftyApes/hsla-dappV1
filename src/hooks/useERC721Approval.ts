import {useEffect, useState} from 'react';
import {Contract} from 'ethers';
import {useWalletAddress} from './useWalletAddress';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {increment} from '../counter/counterSlice';
import {RootState} from 'app/store';

export const useERC721Approval = ({
                                      tokenId,
                                      contract,
                                      operator,
                                  }: {
    contract?: Contract;
    operator?: string;
    tokenId?: string;
}) => {
    const owner = useWalletAddress();

    const [hasApproval, setHasApproval] = useState<boolean>();
    const [hasCheckedApproval, setHasCheckedApproval] = useState(false);

    const dispatch = useAppDispatch();

    const cacheCounter = useAppSelector((state: RootState) => state.counter);

    useEffect(() => {
        checkWhetherHasApproval();

        async function checkWhetherHasApproval() {
            if (!contract || !tokenId) {
                return;
            }

            const result = await contract.getApproved(tokenId);

            setHasApproval(result === operator);
            setHasCheckedApproval(true);
        }
    }, [owner, contract, tokenId, cacheCounter]);

    return {
        hasApproval,
        hasCheckedApproval,

        grantApproval: async ({
                                  onTxSubmitted,
                                  onTxMined,
                                  onPending,
                                  onSuccess,
                                  onError,
                              }: {
            onTxSubmitted?: any;
            onTxMined?: any;
            onPending?: any;
            onSuccess?: any;
            onError?: any;
        }) => {
            onPending && onPending();
            try {
                const tx = await contract?.approve(operator, tokenId);
                onTxSubmitted && onTxSubmitted(tx);
                const receipt = await tx.wait();
                onTxMined && onTxMined(receipt);
                onSuccess && onSuccess();
            } catch (e: any) {
                if (onError) {
                    onError(e);
                } else {
                    alert(e.message);
                }
            }
            dispatch(increment());
        }
    };
};
