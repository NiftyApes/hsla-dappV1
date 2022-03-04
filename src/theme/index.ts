import { extendTheme } from '@chakra-ui/react';

import breakpoints from './breakpoints';
import colors from './colors';
import styles from './styles';

const theme = extendTheme({
  colors,
  breakpoints,
  styles,
});

export default theme;
