import React from 'react';
import {useRaribleTokenMeta} from "../../hooks/useRaribleTokenMeta";
import LoadingIndicator from "../atoms/LoadingIndicator";
import {Flex, Image, Text} from "@chakra-ui/react";
import {NFT} from "../../nft";
import _ from "lodash";

interface Props {
    contractAddress?: string;
    nft?: NFT;
    title: string;
    tokenId?: string;
}

const NFTCardHeader: React.FC<Props> = ({
                                            contractAddress,
                                            nft,
                                            title,
                                            tokenId,
                                        }) => {

    let fetchedNFT: any = useRaribleTokenMeta({
        contractAddress,
        enabled: _.isUndefined(nft),
        tokenId,
    });

    if (!_.isUndefined(nft)) {
        fetchedNFT = nft;
    }

    if (!fetchedNFT.image) {
        return <Flex m="5px" p="11px">
            <LoadingIndicator size='md'/>
        </Flex>
    }

    return (
        <Flex>
            <Image
                alt={fetchedNFT.name}
                border="2px solid"
                borderColor="solid.white"
                borderRadius="6px"
                h="46px"
                m="5px"
                objectFit="cover"
                src={fetchedNFT.image}
                w="46px"
            />

            <Flex m="15px 0 0 10px" fontSize="md" textTransform="uppercase" fontWeight="bold">
                <Text color="solid.gray0" mr="5px">
                    {title}
                </Text>
                <Text color="solid.black">
                    {fetchedNFT.name}
                </Text>
            </Flex>
        </Flex>
    );
}

export default NFTCardHeader;