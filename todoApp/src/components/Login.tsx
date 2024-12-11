// src/components/Login.tsx
import React, { useState, FormEvent } from 'react';
import { useAuthDispatch } from '../Context/AuthDispatchContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const { dispatch } = useAuthDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch({ type: 'LOGIN', payload: username });
      navigate(from, { replace: true });
    }
  };

  return (
    <div style={styles.container}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nom d'utilisateur"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Se Connecter
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '300px',
    margin: '100px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Login;
