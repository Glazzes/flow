import React from 'react';
import {Box} from '@ui/components';
import {
  Canvas,
  Fill,
  Group,
  Image,
  Skia,
  useImage,
  Shader,
  useClockValue,
  useComputedValue,
  useCanvasRef,
} from '@shopify/react-native-skia';
import {useWindowDimensions} from 'react-native';
import {setStatusBarHidden} from 'expo-status-bar';

const source = Skia.RuntimeEffect.Make(`
  uniform float width;
  uniform float height;
  uniform float angle;

  mat2 rotationMatrix(float angle) {
    return mat2(
      cos(angle), -1.0 * sin(angle),
      sin(angle), cos(angle)
    );
  }

  float gradient(float start, float end, float coordinate) {
    float gap = end - start;
    if(coordinate >= start && coordinate <= end) {
        return 1.0 - (coordinate - start) / gap;
    }
    
    if(coordinate >= end) {
        return 0.0;
    }
    
    return 1.0;
}

vec4 main(vec2 pos) {
    vec2 st = pos / vec2(width, height);
    vec2 center = vec2(0.5);

    st -= center;
    st *= rotationMatrix(angle);
    st += center;

    vec3 colorOne = vec3(0.92156862745, 0.82745098039, 0.35294117647);
    vec3 colorTwo = vec3(0.28235294117, 0.78039215686, 0.87058823529);
    vec3 colorThree = vec3(0.67450980392, 0.52156862745, 0.92156862745);
    vec3 colorFour = vec3(0.90588235294, 0.53333333333, 0.81176470588);
    
    vec3 halfOne = mix(colorFour, colorOne, gradient(0.2, 0.8, st.y));
    vec3 halfTwo = mix(colorThree, colorTwo, gradient(0.2, 0.8, st.y));
    
    vec3 final = mix(halfTwo, halfOne, gradient(0.2, 0.8, st.x));
    return vec4(final, 1.0);
  }
`)!;

const TAU = Math.PI * 2;
const ROTATION_TIME = 10000;

const Index: React.FC = ({}) => {
  setStatusBarHidden(true, 'slide');
  const ref = useCanvasRef();
  const {width, height} = useWindowDimensions();
  const image = useImage(require('../assets/games2.png'));

  const time = useClockValue();
  time.start();

  const uniforms = useComputedValue(() => {
    return {
      width,
      height,
      angle: ((time.current % ROTATION_TIME) / ROTATION_TIME) * TAU,
    };
  }, [time]);

  const path = Skia.Path.Make()!;
  path.moveTo(50, 50);
  path.rLineTo(100, 0);
  path.rLineTo(0, 100);
  path.rLineTo(-100, 0);
  path.rLineTo(0, -100);
  path.close();

  if (!image) {
    return null;
  }

  return (
    <Box
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'screenBackground'}>
      <Canvas ref={ref} style={{width, height}}>
        <Fill>
          <Shader source={source} uniforms={uniforms} />
        </Fill>
        <Group opacity={0.3}>
          <Image
            x={0}
            y={0}
            width={width}
            height={height}
            image={image}
            fit={'cover'}
          />
        </Group>
      </Canvas>
    </Box>
  );
};

export default Index;
