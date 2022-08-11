import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import { ReactNode } from 'react';

interface Props {
  Body: ReactNode;
  Header: ReactNode;
}

export const LiquidityPopover: React.FC<Props> = ({ Body, Header }) => (
  <Popover placement="top">
    <PopoverTrigger>
      <span style={{ cursor: 'pointer' }}>
        <Icon name="circle-question-mark" color="solid.gray2" size={16} />
      </span>
    </PopoverTrigger>
    <PopoverContent style={{ textTransform: 'none' }}>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>{Header}</PopoverHeader>
      <PopoverBody>{Body}</PopoverBody>
    </PopoverContent>
  </Popover>
);
