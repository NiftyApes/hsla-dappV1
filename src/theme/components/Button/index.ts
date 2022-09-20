import { StyleObjectOrFn } from '@chakra-ui/react';

const baseStyle: StyleObjectOrFn = {
  _focus: {
    boxShadow: 'none',
  },
  _active: {
    background: 'inherit',
  },
  _disabled: {
    background: 'gray.100',
    color: 'solid.white',
    _hover: {
      background: '#d8d8d8 !important',
    },
  },
};

const variants: { [variant: string]: StyleObjectOrFn } = {
  primary: {
    color: 'gray0',
    bgColor: 'solid.white',
    textTransform: 'uppercase',
    fontSize: '.85em',
  },
  secondary: {
    color: 'primary.purple',
    bgColor: 'accents.100',
    textTransform: 'uppercase',
    fontSize: '.85em',
  },
  neutral: {
    color: 'primary.purple',
    bgColor: 'solid.white',
    borderColor: 'primary.purple',
    border: '2px solid',
    borderRadius: '10px',
    textTransform: 'uppercase',
    fontSize: '.85em',
    _hover: { bg: 'primary.purple', color: 'solid.white' },

  },
  neutralReverse: {
    bgColor: 'primary.purple',
    color: 'solid.white',
    borderRadius: '10px',
    textTransform: 'uppercase',
    fontSize: '.85em',
  },
  notify: {
    bg: 'notification.notify',
    color: 'solid.white',
    textTransform: 'uppercase',
    fontSize: '.85em',
  },
  circle: {
    borderRadius: '50%',
    bg: 'transparent',
    padding: '0 0 0 0',
  },
  alert: {
    bg: 'notification.alert',
    color: 'solid.white',
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
