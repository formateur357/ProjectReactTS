// src/components/Dashboard.tsx
import React from 'react';
import { useAuthState } from '../Context/AuthStateContext';
import { useAuthDispatch } from '../Context/AuthDispatchContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = (): JSX.Element => {
  const { authState } = useAuthState();
  const { dispatch } = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1>Bienvenue, {authState.user}!</h1>
      <button onClick={handleLogout} style={styles.button}>
        Se Déconnecter
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Dashboard;
