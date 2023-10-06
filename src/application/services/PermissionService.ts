export interface PermissionService {
  requestMediaLibraryPermission(): Promise<boolean>;
  requestCameraPermission(): Promise<boolean>;
  requestMicrophonePermission(): Promise<boolean>;
}
