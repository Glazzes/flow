import React from 'react';
import {Box} from '@ui/components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type randomProps = {};

const Random: React.FC<randomProps> = ({}) => {
  const height = useSharedValue<number>(100);
  const styles = useAnimatedStyle(() => ({
    backgroundColor: 'salmon',
    height: height.value,
    width: height.value,
  }));

  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Animated.View style={styles} />
    </Box>
  );
};

export default Random;
