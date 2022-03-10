import { Input } from '@chakra-ui/react';
import InputTheme from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

const Stories = {
  component: Input,
  title: 'atoms/Input',
  argTypes: {
    variant: {
      options: Object.keys(InputTheme.variants),
      control: {
        type: 'radio',
      },
    },
  },
} as ComponentMeta<typeof Input>;

export default Stories;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'primary',
  placeholder: 'Please type any keyword',
};
