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

export const AvailablePopover = () => (
  <Popover placement="top">
    <PopoverTrigger>
      <span style={{ cursor: 'pointer' }}>
        <Icon name="circle-question-mark" color="solid.gray2" size={16} />
      </span>
    </PopoverTrigger>
    <PopoverContent style={{ textTransform: 'none' }}>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>Available Liquidity!</PopoverHeader>
      <PopoverBody>Some descriptive text</PopoverBody>
    </PopoverContent>
  </Popover>
);
