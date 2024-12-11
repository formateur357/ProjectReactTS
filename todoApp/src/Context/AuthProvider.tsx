// src/contexts/AuthProvider.tsx
import React, { useReducer } from 'react';
import AuthStateContext from './AuthStateContext';
import AuthDispatchContext from './AuthDispatchContext';
import { AuthAction, authReducer, AuthState } from '../reducers/AuthReducer';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer<
    React.Reducer<AuthState, AuthAction>
  >(authReducer, {
    isAuthenticated: false,
    user: null,
  });

  return (
    <AuthStateContext.Provider value={{ authState }}>
      <AuthDispatchContext.Provider value={{ dispatch }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;
