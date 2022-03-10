import { StyleObjectOrFn } from '@chakra-ui/react';

const baseStyle: StyleObjectOrFn = {};

const variants: { [variant: string]: StyleObjectOrFn } = {
  primary: {},
  secondary: {},
  neutral: {},
};

const sizes: { [size: string]: StyleObjectOrFn } = {
  xs: {
    container: {
      width: '12px',
      height: '12px',
    },
  },
  sm: { container: { width: '24px', height: '24px' } },
  md: {
    container: {
      width: '32px',
      height: '32px',
    },
  },
  lg: {
    container: {
      width: '48px',
      height: '48px',
    },
  },
  xl: {
    container: {
      width: '64px',
      height: '64px',
    },
  },
};

const defaultProps = {
  size: 'md',
};

const Avatar = {
  baseStyle,
  sizes,
  variants,
  defaultProps,
};

export default Avatar;
