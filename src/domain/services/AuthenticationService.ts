export interface AuthenticationService {
  login<T>(credentials?: T): Promise<void>;
  logout(): Promise<void>;
}
