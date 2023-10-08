import React, {useEffect, useRef, useState} from 'react';
import {Box} from '../../components';
import {
  Camera as VCamera,
  CameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import {StyleSheet} from 'react-native';

const Camera: React.FC = () => {
  const cameraRef = useRef<VCamera>(null);
  const devices = useCameraDevices();
  const [device, setDevice] = useState<CameraDevice | undefined>(devices.front);
  const [hasPermission, setHasPermission] = useState(false);

  const takePhoto = () => {
    cameraRef.current?.takePhoto({qualityPrioritization: 'quality'});
  };

  useEffect(() => {
    const request = async () => {
      const status = await VCamera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    };

    request();
  }, []);

  if (!hasPermission) {
    return null;
  }

  if (device === undefined) {
    return null;
  }

  return (
    <Box flex={1}>
      <VCamera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        video={true}
        photo={true}
        isActive={true}
      />
    </Box>
  );
};

export default Camera;
