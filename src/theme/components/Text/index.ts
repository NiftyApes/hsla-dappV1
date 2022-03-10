import { StyleObjectOrFn } from '@chakra-ui/react';

const baseStyle: StyleObjectOrFn = {};

const variants: { [variant: string]: StyleObjectOrFn } = {
  primary: {},
  secondary: {},
  neutral: {},
};

const sizes: { [size: string]: StyleObjectOrFn } = {
  xs: {},
  sm: {},
  md: {},
  lg: {},
  xl: {},
};

const Text = {
  baseStyle,
  sizes,
  variants,
};

export default Text;
