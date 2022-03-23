import { ComponentStory, ComponentMeta } from '@storybook/react';

import MockImg1 from './mockImgs/1.png';
import Collateral from '.';

const Stories = {
  component: Collateral,
  title: 'molecules/Collateral',
} as ComponentMeta<typeof Collateral>;

export default Stories;

const Template: ComponentStory<typeof Collateral> = (args) => <Collateral w="300px" {...args} />;

export const Default = Template.bind({});
Default.args = {
  img: MockImg1,
  tokenName: 'Token Name',
  collectionName: 'Collection Name',
};
