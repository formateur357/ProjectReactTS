// src/components/ThemeToggleButton.tsx

import { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';

const ThemeToggleButton = () => {
  // Accès au contexte du thème
  const context = useContext(ThemeContext);

  // Vérification que le contexte est défini
  if (!context) {
    throw new Error(
      'ThemeToggleButton doit être utilisé dans un ThemeProvider',
    );
  }

  const { theme, toggleTheme } = context;

  return (
    <button onClick={toggleTheme} style={styles.button}>
      Passer en mode {theme === 'light' ? 'Sombre' : 'Clair'}
    </button>
  );
};

// Styles en ligne pour le bouton
const styles = {
  button: {
    padding: '10px 20px',
    margin: '20px 0',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    fontSize: '16px',
  } as React.CSSProperties,
};

export default ThemeToggleButton;
