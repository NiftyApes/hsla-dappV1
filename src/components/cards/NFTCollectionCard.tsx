import React from 'react';
import {
    Flex,
    Image,
    Text,
} from "@chakra-ui/react";
import {useRaribleCollectionStats} from "../../hooks/useRaribleColectionStats";
import {NFTCollection} from "../../hooks/useTopCollections";

interface Props {
    collection: NFTCollection;
    throttle?: number;
    onClick?: () => void;
}

const NFTCollectionCard: React.FC<Props> = ({
                                                collection,
                                                throttle = 0,
                                                onClick,
                                            }) => {

    const {floorPrice} = useRaribleCollectionStats({
        enabled: true,
        contractAddress: collection?.address,
        throttle,
    });

    return (
        <Flex as="button" flexDir="row" p="10px" borderBottom="1px" borderColor={"gray.100"} onClick={onClick}>
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
                        <Text fontSize="sm" fontWeight="bold" as="span">{floorPrice}Ξ
                        </Text>&nbsp;<Text as="span" fontSize="sm">Floor</Text>
                    </Flex>
                }
            </Flex>
        </Flex>
    );
}

export default NFTCollectionCard;