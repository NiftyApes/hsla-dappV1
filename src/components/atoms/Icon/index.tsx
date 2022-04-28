import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import { ReactComponent as Menu } from './assets/menu.svg';
import { ReactComponent as Notification } from './assets/notification.svg';
import { ReactComponent as Sliders } from './assets/sliders.svg';
import { ReactComponent as ArrowLeft } from './assets/arrow-left.svg';
import { ReactComponent as ChevronUp } from './assets/chevron-up.svg';
import { ReactComponent as MoreVertical } from './assets/more-vertical.svg';
import { ReactComponent as Close } from './assets/close.svg';
import { ReactComponent as Etherscan } from './assets/etherscan.svg';
import { ReactComponent as HelpCircle } from './assets/help-circle.svg';
import { ReactComponent as Filter } from './assets/filter.svg';
import { ReactComponent as Search } from './assets/search.svg';
import { ReactComponent as OS } from './assets/os.svg';
import { ReactComponent as Lock } from './assets/lock.svg';
import { ReactComponent as CircleQuestionMark } from './assets/circle-question-mark.svg';
import { ReactComponent as ArrowRight } from './assets/arrow-right.svg';

export const IconMap = {
  menu: Menu,
  notification: Notification,
  sliders: Sliders,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'chevron-up': ChevronUp,
  'more-vertical': MoreVertical,
  close: Close,
  etherscan: Etherscan,
  'help-circle': HelpCircle,
  filter: Filter,
  search: Search,
  os: OS,
  lock: Lock,
  'circle-question-mark': CircleQuestionMark,
};

interface Props extends BoxProps {
  name: keyof typeof IconMap;
  size?: number;
  color?: string;
}

const Icon: React.FC<Props> = ({ name, color = 'solid.black', size = 18, ...restProps }) => {
  const Component = IconMap[name];

  return (
    <Box as="span" color={color} {...restProps}>
      <Component width={size} height={size} />
    </Box>
  );
};

export default Icon;
