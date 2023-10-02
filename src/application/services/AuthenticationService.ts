export interface AuthenticationService {
  attemptAuthentication<T>(credentials?: T): Promise<void>;
  attemptLogout(): Promise<void>;
}
