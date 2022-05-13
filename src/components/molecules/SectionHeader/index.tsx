import React from 'react';
import { Heading } from '@chakra-ui/react';

interface Props {
  headerText: string;
}

const SectionHeader: React.FC<Props> = ({ headerText }) => {
  return (
    <Heading
      fontFamily='"mulish", "roboto", "helvetica", "arial", san-serif'
      fontStyle="normal"
      fontWeight="700"
      fontSize="1rem"
      color="solid.gray1"
      textTransform="uppercase"
      display="flex"
      align-items="center"
      // p="0 1rem"
      _before={{
        content: "''",
        flex: '1',
        padding: '1px',
        mt: '1ch', // feels more natural to center on non-ascenders
        mr: '1rem',
        background: 'linear-gradient(-90deg, #E0D5EC -1.32%, rgba(224, 213, 236, 0) 100.99%)',
        height: '1px',
      }}
      _after={{
        content: "''",
        flex: '1',
        padding: '1px',
        mt: '1ch', // feels more natural to center on non-ascenders
        ml: '1rem',
        background: 'linear-gradient(90deg, #E0D5EC -1.32%, rgba(224, 213, 236, 0) 100.99%)',
        height: '1px',
      }}
    >
      {headerText}
    </Heading>
  );
};

export default SectionHeader;
