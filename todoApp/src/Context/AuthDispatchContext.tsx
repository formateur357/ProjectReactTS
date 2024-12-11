import { createContext, useContext } from 'react';
import { AuthAction } from '../reducers/AuthReducer';

interface AuthDispatchContextProps {
  dispatch: React.Dispatch<AuthAction>;
}

const AuthDispatchContext = createContext<AuthDispatchContextProps | undefined>(
  undefined,
);

export const useAuthDispatch = (): AuthDispatchContextProps => {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return context;
};

export default AuthDispatchContext;
