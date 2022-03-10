import { ComponentStory, ComponentMeta } from '@storybook/react';

import NumberCenterInput from './NumberCenterInput';

const Stories = {
  component: NumberCenterInput,
  title: 'atoms/Input',
} as ComponentMeta<typeof NumberCenterInput>;

export default Stories;

const Template: ComponentStory<typeof NumberCenterInput> = (args) => (
  <NumberCenterInput w="200px" {...args} />
);

export const NumberCenter = Template.bind({});
NumberCenter.args = {
  placeholder: 'Please type the number',
};
