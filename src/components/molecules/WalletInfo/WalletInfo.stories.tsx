import { ComponentStory, ComponentMeta } from '@storybook/react';

import WalletInfo from '.';

const Stories = {
  component: WalletInfo,
  title: 'molecules/WalletInfo',
} as ComponentMeta<typeof WalletInfo>;

export default Stories;

const Template: ComponentStory<typeof WalletInfo> = (args) => <WalletInfo {...args} />;

export const Default = Template.bind({});
Default.args = {};
