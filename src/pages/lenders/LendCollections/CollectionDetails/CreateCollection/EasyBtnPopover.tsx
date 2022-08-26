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

export const EasyBtnPopover: React.FC = () => (
  <Popover placement="top">
    <PopoverTrigger>
      <span style={{ cursor: 'pointer' }}>
        <Icon name="circle-question-mark" color="solid.gray2" size={16} />
      </span>
    </PopoverTrigger>
    <PopoverContent style={{ textTransform: 'none' }}>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>How does the Easy Button work?</PopoverHeader>
      <PopoverBody>details details</PopoverBody>
    </PopoverContent>
  </Popover>
);
