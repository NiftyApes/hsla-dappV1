import { StyleObjectOrFn } from '@chakra-ui/react';

const baseStyle: StyleObjectOrFn = {
  field: {
    border: '1px solid',
    _focus: {
      boxShadow: 'none',
    },
  },
};

const variants: { [variant: string]: StyleObjectOrFn } = {
  primary: {
    field: {
      borderColor: 'gray.100',
      _focus: {
        borderColor: 'darkGray',
      },
    },
  },
  secondary: {
    field: {
      border: 'none',
      bg: 'accents.100',
      _focus: {
        borderColor: 'none',
      },
    },
  },
  neutral: {},
};

const sizes: { [size: string]: StyleObjectOrFn } = {
  xs: {},
  sm: {},
  md: {},
  lg: {},
  xl: {},
};

const defaultProps = {
  variant: 'primary',
};

const Input = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Input;
