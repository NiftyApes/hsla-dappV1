import { extendTheme } from '@chakra-ui/react';

import breakpoints from './breakpoints';
import colors from './colors';
import components from './components';
import fontSizes from './fontSizes';
import fontWeights from './fontWeights';
import styles from './styles';

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  breakpoints,
  colors,
  components,
  config,
  fontSizes,
  fontWeights,
  styles,
});

export default theme;
