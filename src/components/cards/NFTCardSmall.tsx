import React from 'react';
import {useRaribleTokenMeta} from "../../hooks/useRaribleTokenMeta";
import LoadingIndicator from "../atoms/LoadingIndicator";
import {Box, Flex, Image, Text} from "@chakra-ui/react";
import Icon from "../atoms/Icon";

interface Props {
    contractAddress?: string;
    tokenId?: string;
}

const NFTCardSmall: React.FC<Props> = ({
                                           contractAddress,
                                           tokenId
                                       }) => {

    const nft: any = useRaribleTokenMeta({
        contractAddress,
        tokenId
    });

    if (!nft.image) {
        return <LoadingIndicator size={'md'}/>;
    }

    return (

        <Flex flexDir="row">
            <Flex flexDir="column">
                <Image src={nft.image} w="55px" h="55px" objectFit="cover" borderRadius="10"/>

                <Flex flexDir="row" ml="8px" mt="-10px" alignItems="center">
                    <a href={`https://opensea.io/assets/ethereum/${nft.contractAddress}/${nft.id}`} target="_blank">
                        <Icon name="os" size={20}/>
                    </a>
                    <Box border="1.5px solid" borderRadius="50%" borderColor="solid.white" bgColor="white">
                        <a href={nft.external_url} target="_blank">
                            <Icon name="etherscan" size={15}/>
                        </a>
                    </Box>
                </Flex>
            </Flex>

            <Text mt="15px" ml="10px" fontWeight="bold" fontSize="2xs" color="gray">
                {nft.name}
            </Text>
        </Flex>
    );

}

export default NFTCardSmall;