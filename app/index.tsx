import React, {useEffect, useState} from 'react';
import {Box} from '@ui/components';
import {
  Canvas,
  Fill,
  Image,
  Mask,
  Rect,
  Skia,
  Shader,
  Text as SkText,
  useImage,
  RoundedRect,
  type SkImage,
  Group,
  rrect,
  rect,
  useFont,
} from '@shopify/react-native-skia';
import {Pressable, Text, useWindowDimensions} from 'react-native';
import {setStatusBarHidden} from 'expo-status-bar';
import {hex2rgb, type RGB} from '@ui/utils/colors';
import {
  Easing,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import TemporaryQrCode from '@ui/screens/qrcode_generator/TemporaryQrCode';
import {SHADER_SOURCE} from '@ui/screens/qrcode_generator/constants';

const source = Skia.RuntimeEffect.Make(SHADER_SOURCE)!;

const TAU = Math.PI * 2;
const ROTATION_TIME = 10000;

type Colors = [RGB, RGB, RGB, RGB];

const Index: React.FC = ({}) => {
  const {width, height} = useWindowDimensions();

  const image = useImage(require('../assets/games2.png'));
  const avatar = useImage(require('@assets/images/avatar.png'));

  const DIRECTION = width < height ? width : height;
  const QR_CODE_SIZE = DIRECTION * 0.6;
  const PADDING_HORIZONTAL = DIRECTION * 0.2;
  const PADDING_VERTICAL = (PADDING_HORIZONTAL / 2) * 0.7;

  const FONT_RESIZER = 1.2;
  const font = useFont(
    require('@assets/fonts/Roboto-Bold.ttf'),
    PADDING_VERTICAL * FONT_RESIZER,
  );
  const [textWidth, setTextWidth] = useState<number>(0);

  const AVATAR_SIZE = QR_CODE_SIZE * 0.4;
  const CONTAINER_HEIGHT =
    AVATAR_SIZE +
    QR_CODE_SIZE +
    PADDING_VERTICAL * 3 +
    PADDING_VERTICAL * FONT_RESIZER;

  const AVATAR_POS_X = (DIRECTION - AVATAR_SIZE) / 2;
  const AVATAR_POS_Y = (height - CONTAINER_HEIGHT) / 2;

  const QR_CODE_POS_X = PADDING_HORIZONTAL;
  const QR_CODE_POS_Y = AVATAR_POS_Y + AVATAR_SIZE + PADDING_VERTICAL;

  const CONTAINER_WIDTH = QR_CODE_SIZE + PADDING_HORIZONTAL;
  const CONTAINER_POS_X = PADDING_HORIZONTAL / 2;
  const CONTAINER_POS_Y = AVATAR_POS_Y + AVATAR_SIZE / 2;

  const TEXT_POS_Y = QR_CODE_POS_Y + QR_CODE_SIZE + PADDING_VERTICAL * 2;

  const [qrImage, setQrImage] = useState<SkImage | null>(null);

  const progress = useSharedValue<number>(0);
  const angle = useSharedValue<number>(0);

  const [tag] = useState<string>('@coolnightair');

  const [fromColors, setFromColors] = useState<Colors>(() => {
    return [
      hex2rgb('#E788CF', 'rgb1'),
      hex2rgb('#EAD15A', 'rgb1'),
      hex2rgb('#AC85EB', 'rgb1'),
      hex2rgb('#48C7DE', 'rgb1'),
    ];
  });

  const [toColors, setToColors] = useState<Colors>(() => {
    return [
      hex2rgb('#E788CF', 'rgb1'),
      hex2rgb('#EAD15A', 'rgb1'),
      hex2rgb('#AC85EB', 'rgb1'),
      hex2rgb('#48C7DE', 'rgb1'),
    ];
  });

  const backgroundUniforms = useDerivedValue(() => {
    return {
      progress: progress.value,
      angle: angle.value,
      width,
      height,
      center: [0.5, 0.5],
      from1: fromColors[0],
      from2: fromColors[1],
      from3: fromColors[2],
      from4: fromColors[3],
      to1: toColors[0],
      to2: toColors[1],
      to3: toColors[2],
      to4: toColors[3],
    };
  }, [angle, progress, fromColors, toColors]);

  const qrUniforms = useDerivedValue(() => {
    return {
      progress: progress.value,
      angle: angle.value,
      width: QR_CODE_SIZE,
      height: QR_CODE_SIZE,
      center: [0.5, 0.5],
      from1: fromColors[0],
      from2: fromColors[1],
      from3: fromColors[2],
      from4: fromColors[3],
      to1: toColors[0],
      to2: toColors[1],
      to3: toColors[2],
      to4: toColors[3],
    };
  }, [angle, progress, QR_CODE_SIZE, fromColors, toColors]);

  const mixColors = () => {
    const newColros: Colors = [
      hex2rgb('#78BADD', 'rgb1'),
      hex2rgb('#89C992', 'rgb1'),
      hex2rgb('#91D1CB', 'rgb1'),
      hex2rgb('#CEE297', 'rgb1'),
    ];

    setToColors(newColros);

    progress.value = withTiming(
      1,
      {duration: 1000, easing: Easing.linear},
      finished => {
        if (finished) {
          runOnJS(assignNewColors)(newColros);
        }
      },
    );
  };

  const assignNewColors = (colors: Colors): void => {
    setFromColors(colors);
    progress.value = 0;
  };

  useEffect(() => {
    if (font) {
      const w = font.getTextWidth(tag.toUpperCase());
      setTextWidth(w);
    }
  }, [tag, font]);

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(TAU, {duration: ROTATION_TIME, easing: Easing.linear}),
      -1,
      false,
    );
  }, [angle]);

  useEffect(() => {
    setStatusBarHidden(true, 'none');
  }, []);

  if (qrImage === null) {
    return (
      <TemporaryQrCode
        size={QR_CODE_SIZE}
        value={tag}
        makeSnapshot={setQrImage}
      />
    );
  }

  if (!image && !qrImage && !avatar && !font) {
    return null;
  }

  return (
    <Box
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'cardPrimaryBackground'}>
      <Canvas style={{width, height}}>
        <Fill>
          <Shader source={source} uniforms={backgroundUniforms} />
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

        <RoundedRect
          x={CONTAINER_POS_X}
          y={CONTAINER_POS_Y}
          width={CONTAINER_WIDTH}
          height={CONTAINER_HEIGHT - AVATAR_SIZE / 2}
          color={'#ffffff'}
          r={16}
        />

        <Mask
          mode="luminance"
          mask={
            <Group>
              <Image
                x={QR_CODE_POS_X}
                y={QR_CODE_POS_Y}
                width={QR_CODE_SIZE}
                height={QR_CODE_SIZE}
                image={qrImage}
              />
              <SkText
                x={PADDING_HORIZONTAL / 2 + (CONTAINER_WIDTH - textWidth) / 2}
                y={TEXT_POS_Y}
                text={tag.toUpperCase()}
                font={font}
                color={'white'}
              />
            </Group>
          }>
          <Rect
            x={QR_CODE_POS_X - PADDING_VERTICAL}
            y={QR_CODE_POS_Y}
            width={QR_CODE_SIZE + PADDING_VERTICAL * 2}
            height={QR_CODE_SIZE + PADDING_VERTICAL * FONT_RESIZER * 2}>
            <Shader
              transform={[
                {translateX: QR_CODE_POS_X},
                {translateY: QR_CODE_POS_Y},
              ]}
              source={source}
              uniforms={qrUniforms}
            />
          </Rect>
        </Mask>

        <Image
          x={AVATAR_POS_X}
          y={AVATAR_POS_Y}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          image={avatar}
          clip={rrect(
            rect(AVATAR_POS_X, AVATAR_POS_Y, AVATAR_SIZE, AVATAR_SIZE),
            AVATAR_SIZE / 2,
            AVATAR_SIZE / 2,
          )}
        />

        {/*
          <Rect
          x={QR_CODE_POS_X - (textWidth - QR_CODE_SIZE) / 2}
          y={QR_CODE_POS_Y}
          width={QR_CODE_SIZE + (textWidth - QR_CODE_SIZE)}
          height={
            QR_CODE_SIZE + PADDING_VERTICAL + PADDING_VERTICAL * FONT_RESIZER
          }
          color={'black'}
        />

          */}
      </Canvas>

      <Pressable
        onPress={mixColors}
        style={{
          padding: 16,
          backgroundColor: 'orange',
          position: 'absolute',
          bottom: 16,
          opacity: 0,
        }}>
        <Text>Switch colors</Text>
      </Pressable>
    </Box>
  );
};

export default Index;
