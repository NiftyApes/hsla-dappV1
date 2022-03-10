import { Avatar } from '@chakra-ui/react';
import AvatarTheme from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

const Stories = {
  component: Avatar,
  title: 'atoms/Avatar',
  argTypes: {
    size: {
      options: Object.keys(AvatarTheme.sizes),
      control: {
        type: 'radio',
      },
    },
  },
} as ComponentMeta<typeof Avatar>;

export default Stories;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  name: 'John Doe',
};
