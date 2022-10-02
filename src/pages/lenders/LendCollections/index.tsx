import React from 'react';
import {
    ModalContent,
    ModalOverlay,
    Modal,
} from '@chakra-ui/react';
import {Link} from "react-router-dom";
import {useTopCollections} from "../../../hooks/useTopCollections";
import NFTCollectionCard from "../../../components/cards/NFTCollectionCard";

const LendCollections: React.FC = () => {

    const {collections} = useTopCollections();

    return (

        <Modal isOpen={true} onClose={() => {
        }} size="xl">
            <ModalOverlay/>
            <ModalContent p="5px">
                {collections.map((collection) => {
                    return (
                        <Link to={`/lenders/create-collection-offer/${collection.address}`}>
                            <NFTCollectionCard contractAddress={collection.address}/>
                        </Link>
                    )
                })}
            </ModalContent>
        </Modal>
    );
};

export default LendCollections;
