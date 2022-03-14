import { ComponentStory, ComponentMeta } from '@storybook/react';

import MockImg1 from './mockImgs/1.png';
import NFTCard from '.';

const Stories = {
  component: NFTCard,
  title: 'atoms/NFTCard',
} as ComponentMeta<typeof NFTCard>;

export default Stories;

const Template: ComponentStory<typeof NFTCard> = (args) => <NFTCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  img: MockImg1,
  collectionName: 'COLLECTION.NAME',
  tokenName: 'TOKEN.NAME',
  offer: {
    type: 'floor',
    price: 42.167,
    days: 120,
    aprPercentage: 25,
    symbol: 'eth',
  },
  numberOfOffers: 1425,
};
