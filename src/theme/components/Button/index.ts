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
  secondary: {
    color: 'primary.purple',
    bgColor: 'accents.100',
  },
  neutral: {
    color: 'primary.purple',
    bgColor: 'solid.white',
    borderColor: 'primary.purple',
    border: '2px solid',
    borderRadius: '10px',
  },
  notify: {
    bg: 'notification.notify',
    color: 'solid.white',
  },
  circle: {
    borderRadius: '50%',
    bg: 'transparent',
  },
};

const sizes: { [size: string]: StyleObjectOrFn } = {
  xs: {
    fontSize: '2xs',
    padding: '6px 9px',
    borderRadius: '10px',
  },
  sm: {
    fontSize: 'sm',
  },
  md: {
    fontWeight: 'bold',
    fontSize: '2md',
    borderRadius: '40px',
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
