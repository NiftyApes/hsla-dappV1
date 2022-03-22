import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import BorrowerAllMatchingOffersModal from '.';

const Stories = {
  component: BorrowerAllMatchingOffersModal,
  title: 'organisms/BorrowerAllMatchingOffersModal',
} as ComponentMeta<typeof BorrowerAllMatchingOffersModal>;

export default Stories;

const Template: ComponentStory<typeof BorrowerAllMatchingOffersModal> = (args) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Box>
        <Button onClick={onOpen}>Show Modal</Button>
      </Box>
      <BorrowerAllMatchingOffersModal {...args} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
