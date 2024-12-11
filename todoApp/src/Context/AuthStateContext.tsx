import { createContext, useContext } from 'react';
import { AuthState } from '../reducers/AuthReducer';

interface AuthStateContextProps {
  authState: AuthState;
}

const AuthStateContext = createContext<AuthStateContextProps | undefined>(
  undefined,
);

export const useAuthState = (): AuthStateContextProps => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
};

export default AuthStateContext;
