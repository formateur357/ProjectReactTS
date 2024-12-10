// src/components/Header.tsx

import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';

const Header = (): JSX.Element => {
  // Accès au contexte du thème
  const context = useContext(ThemeContext);

  // Vérification que le contexte est défini
  if (!context) {
    throw new Error('Header doit être utilisé dans un ThemeProvider');
  }

  const { theme } = context;

  // Styles conditionnels basés sur le thème
  const headerStyles: React.CSSProperties = {
    backgroundColor: theme === 'light' ? '#e0e0e0' : '#333333',
    color: theme === 'light' ? '#000000' : '#FFFFFF',
    padding: '10px 20px',
    textAlign: 'center',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  return (
    <header style={headerStyles}>
      <h2>Todo List</h2>
    </header>
  );
};

export default Header;
