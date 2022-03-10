import { Button } from '@chakra-ui/react';
import ButtonTheme from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

const Stories = {
  component: Button,
  title: 'atoms/Button',
  argTypes: {
    variant: {
      options: Object.keys(ButtonTheme.variants),
      control: {
        type: 'radio',
      },
    },
  },
} as ComponentMeta<typeof Button>;

export default Stories;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary',
};
