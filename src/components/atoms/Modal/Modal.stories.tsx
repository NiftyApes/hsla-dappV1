import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import Modal from './Modal';

const Stories = {
  component: Modal,
  title: 'atoms/Modal',
};

export default Stories as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Box>
        <Button onClick={onOpen}>Show Modal</Button>
      </Box>
      <Modal {...args} isOpen={isOpen} onClose={onClose}>
        <Box p="50px">This is the sample modal we built.</Box>
      </Modal>
    </>
  );
};

export const PartialModal = Template.bind({});
PartialModal.args = {};

export const FullScreenModal = Template.bind({});
FullScreenModal.args = {
  size: 'full',
};
