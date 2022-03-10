import { Input, InputProps } from '@chakra-ui/react';
import React from 'react';

const NumberCenterInput: React.FC<InputProps> = ({ placeholder, ...restProps }) => {
  return (
    <Input
      variant="secondary"
      textAlign="center"
      fontSize="2xs"
      type="number"
      placeholder={placeholder}
      _placeholder={{
        fontSize: '2xs',
        fontStyle: 'italic',
      }}
      {...restProps}
    />
  );
};

export default NumberCenterInput;
