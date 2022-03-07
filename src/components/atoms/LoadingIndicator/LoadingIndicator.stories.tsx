import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoadingIndicator from '.';

const Stories = {
  component: LoadingIndicator,
  title: 'atoms/LoadingIndicator',
};

export default Stories as ComponentMeta<typeof LoadingIndicator>;

const Template: ComponentStory<typeof LoadingIndicator> = (args) => <LoadingIndicator {...args} />;

export const FullScreen = Template.bind({});
FullScreen.args = {
  fullScreen: true,
};

export const Default = Template.bind({});
Default.args = {
  fullScreen: false,
};
