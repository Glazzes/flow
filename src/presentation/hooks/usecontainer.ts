import {useMemo} from 'react';
import container from '../../configuration/container';

/**
 * @param identifier Qualifying name for a previously registered container instance
 * @returns A qualifying instance based on the speficied generic type if present
 */
export default function useContainer<T>(identifier: string): T {
  const instance = useMemo(() => {
    return container.get<T>(identifier);
  }, [identifier]);

  return instance;
}
