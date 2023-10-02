import {MMKV} from 'react-native-mmkv';
import {injectable} from 'inversify';

@injectable()
export default class LocalStorageService {
  private mmkv: MMKV = new MMKV();

  initializeStorageForLoggedUser(userId: string): void {
    this.mmkv = new MMKV({id: `user-${userId}`});
  }

  getString(key: string): string | undefined {
    return this.mmkv.getString(key);
  }

  setString(key: string, value: string): void {
    this.mmkv.set(key, value);
  }
}
