import {LocalStorageService} from '@domain/services';
import {setItemAsync} from 'expo-secure-store';

export default class SecureLocalStorageService implements LocalStorageService {
  async getString(identifier: string): Promise<String> {
    throw new Error('Method not implemented.');
  }

  async setString(identifier: string, value: string): Promise<void> {
    setItemAsync(identifier, value);
  }
}
