import React from 'react';
import { Box } from '@chakra-ui/react';

import { ReactComponent as Menu } from './assets/menu.svg';
import { ReactComponent as Notification } from './assets/notification.svg';

export const IconMap = {
  menu: Menu,
  notification: Notification,
};

interface Props {
  name: keyof typeof IconMap;
  color?: string;
}

const Icon: React.FC<Props> = ({ name, color = 'solid.black' }) => {
  const Component = IconMap[name];

  return (
    <Box as="span" color={color}>
      <Component />
    </Box>
  );
};

export default Icon;
