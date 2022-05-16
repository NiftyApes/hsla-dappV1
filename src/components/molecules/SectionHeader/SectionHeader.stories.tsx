import { ComponentStory, ComponentMeta } from '@storybook/react';

import SectionHeader from '.';

const Stories = {
  component: SectionHeader,
  title: 'molecules/SectionHeader',
} as ComponentMeta<typeof SectionHeader>;

export default Stories;

const Template: ComponentStory<typeof SectionHeader> = (args) => <SectionHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  headerText: 'Default Text',
};
