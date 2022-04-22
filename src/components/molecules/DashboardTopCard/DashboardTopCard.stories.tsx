import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '@chakra-ui/react';

import DashboardTopCard from '.';

const Stories = {
  component: DashboardTopCard,
  title: 'molecules/DashboardTopCard',
} as ComponentMeta<typeof DashboardTopCard>;

export default Stories;

const Template: ComponentStory<typeof DashboardTopCard> = (args) => (
  <DashboardTopCard w="300px" {...args} />
);

export const Example = Template.bind({});
Example.args = {
  desc: 'ACTIVE LOAN',
  children: <Text fontSize="7xl">1</Text>,
};
