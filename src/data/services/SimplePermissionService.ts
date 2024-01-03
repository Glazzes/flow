import {injectable} from 'inversify';
import {PermissionService} from '@domain/services';
import {requestPermissionsAsync, getPermissionsAsync} from 'expo-media-library';
import {Camera} from 'react-native-vision-camera';

@injectable()
export default class SimplePermissionService implements PermissionService {
  async checkCameraPermission(): Promise<boolean> {
    const response = await Camera.getCameraPermissionStatus();
    return Promise.resolve(response === 'authorized');
  }

  async requestCameraPermission(): Promise<boolean> {
    const response = await Camera.requestCameraPermission();
    return Promise.resolve(response === 'authorized');
  }

  async checkMediaLibraryPermission(): Promise<boolean> {
    const response = await getPermissionsAsync();
    return Promise.resolve(response.granted);
  }

  async requestMediaLibraryPermission(): Promise<boolean> {
    const response = await requestPermissionsAsync();
    return Promise.resolve(response.granted);
  }

  async requestMicrophonePermission(): Promise<boolean> {
    const response = await Camera.requestMicrophonePermission();
    return Promise.resolve(response === 'authorized');
  }
}
