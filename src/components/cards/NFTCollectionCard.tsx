import React from 'react';
import LoadingIndicator from "../atoms/LoadingIndicator";
import {Flex, Image, Text} from "@chakra-ui/react";
import {useCollectionMetadata} from "../../hooks/useCollectionMetadata";
import {useCollectionStats} from "../../hooks/useColectionStats";

interface Props {
    contractAddress?: string;
    tokenId?: string;
}

const NFTCollectionCard: React.FC<Props> = ({contractAddress}) => {

    // This is option.
    const fetchedNFT: any = useCollectionMetadata({
        nftContractAddress: contractAddress,
    });

    const {floorPrice, volume} = useCollectionStats({nftContractAddress: contractAddress});

    if (!fetchedNFT.image) {
        return <LoadingIndicator size={'md'}/>;
    }

    return (
        <Flex flexDir="row" p="10px">
            <Image src={fetchedNFT.image} w="55px" h="55px" borderRadius="full"/>
            <Flex flexDir="column" ml="10px">
                <Text fontWeight='bold'>{fetchedNFT.name}</Text>
                <Text>{fetchedNFT.address}</Text>
                <Flex flexDir="column">
                    <Text>Floor price: {floorPrice}</Text>
                    <Text>Volume: {volume}</Text>
                </Flex>
            </Flex>
        </Flex>
    );

}

export default NFTCollectionCard;