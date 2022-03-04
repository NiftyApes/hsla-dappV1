import { Box, Grid } from '@chakra-ui/react';
import { FC } from 'react';

// colors
import colors from '.';

const Colors: FC = () => {
  return (
    <Grid
      gridTemplateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)', 'repeat(5, 1fr)', 'repeat(6, 1fr)']}
      gridRowGap="20px"
    >
      {Object.entries(colors).map(([key, value]) => {
        if (typeof value === 'string') {
          return (
            <Box textTransform="capitalize">
              {key}
              <Box w="100px" h="50px" backgroundColor={value} />
              {value}
            </Box>
          );
        } else {
          const child = colors[key as keyof typeof colors];
          return Object.entries(child).map(([childKey, childValue]) => (
            <Box textTransform="capitalize">
              {key}.{childKey}
              <Box w="100px" h="50px" backgroundColor={childValue} />
              {childValue}
            </Box>
          ));
        }
      })}
    </Grid>
  );
};

export { Colors };
