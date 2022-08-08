import { ComponentStory, ComponentMeta } from '@storybook/react';

import MockImg1 from './mockImgs/1.png';
import BorrowerOfferDetailsCard from '.';

const Stories = {
  component: BorrowerOfferDetailsCard,
  title: 'molecules/BorrowerOfferDetailsCard',
} as ComponentMeta<typeof BorrowerOfferDetailsCard>;

export default Stories;

const Template: ComponentStory<typeof BorrowerOfferDetailsCard> = (args) => (
  <BorrowerOfferDetailsCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  img: MockImg1,
  tokenName: 'Bored Ape Yatch Club',
  tokenId: '222',
  offer: {
    type: 'floor',
    price: 42.167,
    days: 120,
    aprPercentage: 25,
    symbol: 'eth',
  },
};
