import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import { ReactComponent as Menu } from './assets/menu.svg';
import { ReactComponent as Notification } from './assets/notification.svg';
import { ReactComponent as Sliders } from './assets/sliders.svg';
import { ReactComponent as ArrowLeft } from './assets/arrow-left.svg';
import { ReactComponent as ChevronUp } from './assets/chevron-up.svg';
import { ReactComponent as MoreVertical } from './assets/more-vertical.svg';
import { ReactComponent as Close } from './assets/close.svg';

export const IconMap = {
  menu: Menu,
  notification: Notification,
  sliders: Sliders,
  'arrow-left': ArrowLeft,
  'chevron-up': ChevronUp,
  'more-vertical': MoreVertical,
  close: Close,
};

interface Props extends BoxProps {
  name: keyof typeof IconMap;
  color?: string;
}

const Icon: React.FC<Props> = ({ name, color = 'solid.black', ...restProps }) => {
  const Component = IconMap[name];

  return (
    <Box as="span" color={color} {...restProps}>
      <Component />
    </Box>
  );
};

export default Icon;