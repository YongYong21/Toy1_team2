import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../api/firebase';

export type AuthState =
  | { state: 'loading' }
  | { state: 'loaded'; isAuthentication: true; user: User | null }
  | { state: 'loaded'; isAuthentication: false; user: null }
  | { state: 'error'; error: Error };

export const AuthStateContext = createContext<AuthState | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({ state: 'loading' });

  const onChange = (user: User | null) => {
    if (user) {
      setAuthState({ state: 'loaded', isAuthentication: true, user });
    } else {
      setAuthState({ state: 'loaded', isAuthentication: false, user });
    }
  };
  const setError = (error: Error) => setAuthState({ state: 'error', error });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onChange, setError);
    return () => unsubscribe();
  }, []);

  return <AuthStateContext.Provider value={authState}>{children}</AuthStateContext.Provider>;
};

export const useAuthState = () => {
  const authState = useContext(AuthStateContext);
  if (!authState) throw new Error('AuthProvider not found');
  return authState;
};
