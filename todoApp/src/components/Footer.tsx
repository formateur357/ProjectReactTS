// src/components/Footer.tsx

import { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';

function Footer(): JSX.Element {
  // Accès au contexte du thème
  const context = useContext(ThemeContext);

  // Vérification que le contexte est défini
  if (!context) {
    throw new Error('Footer doit être utilisé dans un ThemeProvider');
  }

  const { theme } = context;

  // Styles conditionnels basés sur le thème
  const styles = {
    footer: {
      textAlign: 'center' as const,
      padding: '1rem',
      backgroundColor: theme === 'light' ? '#f4f4f4' : '#1f1f1f',
      borderTop: theme === 'light' ? '1px solid #ddd' : '1px solid #333',
      marginTop: '2rem',
      transition: 'background-color 0.3s ease, border-top 0.3s ease',
    },
    text: {
      margin: 0,
      fontSize: '0.9rem',
      color: theme === 'light' ? '#666' : '#ccc',
    },
    link: {
      color: theme === 'light' ? '#007BFF' : '#66B2FF',
      textDecoration: 'none',
    },
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {new Date().getFullYear()} Todo App. Tous droits réservés.
      </p>
      <p style={styles.text}>Conçu avec ❤️ par moguy</p>
    </footer>
  );
}

export default Footer;
