export interface LocalStorageService {
  getString(identifier: string): Promise<String>;
  setString(identifier: string, value: string): Promise<void>;
}
