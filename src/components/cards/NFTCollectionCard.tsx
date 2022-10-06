import React from 'react';
import {
    Flex,
    Image,
    Text,
} from "@chakra-ui/react";
import {useCollectionStats} from "../../hooks/useColectionStats";
import {NFTCollection} from "../../hooks/useTopCollections";

interface Props {
    collection: NFTCollection;
}

const NFTCollectionCard: React.FC<Props> = ({collection}) => {

    const {floorPrice} = useCollectionStats({nftContractAddress: collection?.address});

    return (
        <Flex flexDir="row" p="10px" borderBottom="1px" borderColor={"gray.100"}>
            <Image
                src={collection.image}
                w="55px"
                h="55px"
                mr="7px"
                borderRadius="full"
            />
            <Flex flexDir="column" ml="10px">

                <Text fontWeight='bold' mt="4px">{collection.name}</Text>

                {floorPrice &&
                    <Flex flexDir="row">
                        <Text fontSize="sm" fontWeight="bold" as="span">{floorPrice}Ξ</Text>&nbsp;<Text as="span"
                                                                                                        fontSize="sm">Floor</Text>
                    </Flex>
                }
            </Flex>
        </Flex>
    );
}

export default NFTCollectionCard;