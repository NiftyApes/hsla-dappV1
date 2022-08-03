import { ComponentStory, ComponentMeta } from '@storybook/react';

import MockImg1 from './mockImgs/1.png';
import NFTNoOfferCard from '.';

const Stories = {
  component: NFTNoOfferCard,
  title: 'molecules/NFTNoOfferCard',
} as ComponentMeta<typeof NFTNoOfferCard>;

export default Stories;

const Template: ComponentStory<typeof NFTNoOfferCard> = (args) => <NFTNoOfferCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  img: MockImg1,
  collectionName: 'CRYPTOMANGA GENESIS',
  tokenName: 'CryptoManga',
  tokenId: '1232',
};
