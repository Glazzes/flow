import React from 'react';
import {Box, Text} from '@ui/components';

const index: React.FC = ({}) => {
  return (
    <Box
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'screenBackground'}>
      <Text variant={'title'}>Hello world</Text>
    </Box>
  );
};

export default index;
