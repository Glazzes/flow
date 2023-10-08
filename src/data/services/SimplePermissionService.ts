import {injectable} from 'inversify';
import {PermissionService} from '@domain/services';
import {requestPermissionsAsync} from 'expo-media-library';
import {Camera} from 'react-native-vision-camera';

@injectable()
export default class SimplePermissionService implements PermissionService {
  async requestCameraPermission(): Promise<boolean> {
    const response = await requestPermissionsAsync();
    return Promise.resolve(response.status === 'granted');
  }

  async requestMediaLibraryPermission(): Promise<boolean> {
    const response = await Camera.requestCameraPermission();
    return Promise.resolve(response === 'authorized');
  }

  requestMicrophonePermission(): Promise<boolean> {
    return Promise.resolve(false);
  }
}
