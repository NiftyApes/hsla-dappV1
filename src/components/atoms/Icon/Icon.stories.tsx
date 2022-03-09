import { Box, Grid } from '@chakra-ui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { colorNames } from 'theme/colors';

import Icon, { IconMap } from '.';

const Stories = {
  component: Icon,
  title: 'atoms/Icon',
};

export default Stories as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'menu',
};
Default.argTypes = {
  name: {
    options: Object.keys(IconMap),
    control: {
      type: 'select',
    },
  },
  color: {
    options: colorNames(),
    control: {
      type: 'select',
    },
  },
};

export const IconList = () => {
  return (
    <Grid
      gridTemplateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(6, 1fr)']}
      gap="50px"
    >
      {Object.keys(IconMap).map((key) => (
        <Box key={key} fontSize="2xs">
          <Icon name={key as keyof typeof IconMap} />
          {key}
        </Box>
      ))}
    </Grid>
  );
};

export const IconWithColors = () => {
  return (
    <Grid
      gridTemplateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(6, 1fr)']}
      gap="50px"
    >
      {colorNames().map((color) => (
        <Box key={color} fontSize="2xs">
          <Icon name="menu" color={color} />
          {color}
        </Box>
      ))}
    </Grid>
  );
};
