import React from 'react';
import {
  Button,
  Modal as ChakraModal,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

import Icon from '../Icon';

const Modal: React.FC<Omit<ModalProps, 'onClose'> & { onClose?: () => void }> = ({
  children,
  ...restProps
}) => {
  const modalContentProps =
    restProps.size === 'full'
      ? {}
      : ({
          w: '956px',
          pos: 'relative',
          maxW: 'auto',
          boxShadow: '0px 4px 24px rgba(73, 16, 146, 0.1)',
          borderRadius: '25px',
        } as ModalContentProps);

  return (
    <ChakraModal isCentered closeOnOverlayClick={false} onClose={() => null} {...restProps}>
      <ModalOverlay />
      <ModalContent bgColor="solid.gray5" {...modalContentProps}>
        {restProps.onClose && (
          <Button variant="link" onClick={restProps.onClose} pos="absolute" top="30px" right="30px">
            <Icon name="close" />
          </Button>
        )}
        {children}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
