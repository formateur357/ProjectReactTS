export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

export type AuthAction =
  | { type: 'LOGIN'; payload: string }
  | { type: 'LOGOUT' };

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};
