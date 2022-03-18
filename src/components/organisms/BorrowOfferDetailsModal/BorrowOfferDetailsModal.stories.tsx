import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import BorrowOfferDetailsModal from '.';

const Stories = {
  component: BorrowOfferDetailsModal,
  title: 'organisms/BorrowOfferDetailsModal',
} as ComponentMeta<typeof BorrowOfferDetailsModal>;

export default Stories;

const Template: ComponentStory<typeof BorrowOfferDetailsModal> = (args) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Box>
        <Button onClick={onOpen}>Show Modal</Button>
      </Box>
      <BorrowOfferDetailsModal {...args} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
