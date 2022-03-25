import { Button, Grid, GridItem } from '@chakra-ui/react';
import ButtonTheme from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from 'components/atoms/Icon';

const Stories = {
  component: Button,
  title: 'atoms/Button',
} as ComponentMeta<typeof Button>;

export default Stories;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const WithVariant = Template.bind({});
WithVariant.args = { variant: 'primary', size: 'md', children: 'Primary' };
WithVariant.argTypes = {
  variant: {
    options: Object.keys(ButtonTheme.variants),
    control: {
      type: 'radio',
    },
  },
};

export const Buttons = () => (
  <Grid gridTemplateColumns="repeat(4, minmax(0, 1fr))" gap="20px">
    <GridItem colSpan={1}>
      <Button variant="primary">Primary</Button>
    </GridItem>
    <GridItem colSpan={1}>
      <Button variant="secondary">Secondary</Button>
    </GridItem>
    <GridItem colSpan={1}>
      <Button variant="neutral">Neutral</Button>
    </GridItem>
    <GridItem colSpan={1}>
      <Button variant="circle" background="gray.100">
        <Icon name="menu" size={15} />
      </Button>
    </GridItem>
    <GridItem colSpan={1}>
      <Button variant="notify">Notify</Button>
    </GridItem>
    <GridItem colSpan={1}>
      <Button variant="neutralReverse">Neutral Reverse</Button>
    </GridItem>
    <GridItem colSpan={1}>
      <Button variant="neutralReverse" disabled>
        Disabled
      </Button>
    </GridItem>
  </Grid>
);
