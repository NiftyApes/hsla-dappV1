import React, { useCallback, useEffect } from 'react';
import { 
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { useLocalStorage } from 'hooks/useLocalStorage';

interface GlobalModalProps {
  storageKey: string;
  title: string;
  description: string;
  actionText: string;
}

const GlobalModal: React.FC<GlobalModalProps> = ({ storageKey, title, description, actionText }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [value, setValue] = useLocalStorage(storageKey, false);

  useEffect(() => {
    if (!value) {
      onOpen();
    }
  }, [onOpen, value]);

  const handleClose = useCallback(() => {
    if (!value) {
      return;
    }

    onClose();
  }, [value, onClose]);

  const handleAction = useCallback(() => {
    setValue(true);
    onClose();
  }, [setValue, onClose]);

  return (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {description}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleAction}>{actionText}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default GlobalModal;
