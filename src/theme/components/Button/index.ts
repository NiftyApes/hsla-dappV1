import { StyleObjectOrFn } from '@chakra-ui/react';

const baseStyle: StyleObjectOrFn = {
  _focus: {
    boxShadow: 'none',
  },
  _active: {
    background: 'inherit',
  },
};

const variants: { [variant: string]: StyleObjectOrFn } = {
  primary: {
    color: 'darkGray',
    bgColor: 'solid.white',
  },
  secondary: {},
  neutral: {},
  icon: {
    borderRadius: '50%',
  },
};

const sizes: { [size: string]: StyleObjectOrFn } = {
  xs: {},
  sm: {},
  md: {
    fontWeight: 'bold',
    fontSize: '2md',
  },
  lg: {},
  xl: {},
};

const defaultProps = {};

const Button = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Button;
