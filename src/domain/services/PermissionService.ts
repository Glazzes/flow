export interface PermissionService {
  checkMediaLibraryPermission(): Promise<boolean>;
  checkCameraPermission(): Promise<boolean>;
  requestMediaLibraryPermission(): Promise<boolean>;
  requestCameraPermission(): Promise<boolean>;
  requestMicrophonePermission(): Promise<boolean>;
}
