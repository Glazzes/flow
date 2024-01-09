import React, {useMemo, useEffect} from 'react';
import {
  Canvas,
  Picture,
  useCanvasRef,
  type SkImage,
  type SkPicture,
  ImageFormat,
} from '@shopify/react-native-skia';
import {renderQrCode} from './generator';
import {Box} from '@ui/components';

type TemporaryQrCodeProps = {
  value: string;
  size: number;
  makeSnapshot: (image: SkImage | null) => void;
};

const TemporaryQrCode: React.FC<TemporaryQrCodeProps> = ({
  value,
  size,
  makeSnapshot,
}) => {
  const ref = useCanvasRef();

  const picture: SkPicture = useMemo(() => {
    return renderQrCode({
      value,
      frameSize: size,
      contentCells: 7,
      dotColor: '#ffffff',
      errorCorrectionLevel: 'high',
    });
  }, [value, size]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const pic = ref.current?.makeImageSnapshot();
      if (pic) {
        makeSnapshot(pic);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [ref, size, makeSnapshot]);

  return (
    <Box
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'cardPrimaryBackground'}>
      <Canvas ref={ref} style={{width: size, height: size}}>
        <Picture picture={picture} />
      </Canvas>
    </Box>
  );
};

export default TemporaryQrCode;
