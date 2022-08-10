import { ComponentStory, ComponentMeta } from '@storybook/react';

import MockImg1 from './mockImgs/1.png';
import NFTCard from '.';

const Stories = {
  component: NFTCard,
  title: 'molecules/NFTCard',
} as ComponentMeta<typeof NFTCard>;

export default Stories;

const Template: ComponentStory<typeof NFTCard> = (args) => <NFTCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  img: MockImg1,
  collectionName: 'COLLECTION.NAME',
  tokenName: 'TOKEN.NAME',
  offer: {
    aprPercentage: 25,
    durationDays: 30,
    expirationDays: 120,
    price: 42.167,
    symbol: 'eth',
    totalInterest: 123,
    type: 'floor',
  },
  numberOfOffers: 1425,
};
