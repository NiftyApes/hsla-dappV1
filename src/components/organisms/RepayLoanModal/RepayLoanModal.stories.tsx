import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import RepayLoanModal from '.';

const Stories = {
  component: RepayLoanModal,
  title: 'organisms/RepayLoanModal',
} as ComponentMeta<typeof RepayLoanModal>;

export default Stories;

const Template: ComponentStory<typeof RepayLoanModal> = (args) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Box>
        <Button onClick={onOpen}>Show Modal</Button>
      </Box>
      <RepayLoanModal {...args} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
