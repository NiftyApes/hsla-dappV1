import { Box, Grid } from '@chakra-ui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CryptoIcon from '.';
import { COIN_SYMBOL_MAP } from './constants';

const Stories = {
  component: CryptoIcon,
  title: 'atoms/CryptoIcon',
};

export default Stories as ComponentMeta<typeof CryptoIcon>;

const Template: ComponentStory<typeof CryptoIcon> = (args) => <CryptoIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  symbol: 'eth',
};
Default.argTypes = {
  symbol: {
    options: Object.keys(COIN_SYMBOL_MAP),
    control: {
      type: 'select',
    },
  },
};

export const CryptoIconList = () => {
  return (
    <Grid
      gridTemplateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(6, 1fr)']}
      gap="50px"
    >
      {Object.keys(COIN_SYMBOL_MAP).map((key) => (
        <Box key={key} fontSize="2xs">
          <CryptoIcon symbol={key as keyof typeof COIN_SYMBOL_MAP} />
          {key}
        </Box>
      ))}
    </Grid>
  );
};
