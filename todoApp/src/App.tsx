// src/App.tsx

import React, { useContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggleButton from './components/ThemeToggleButton';
import { ThemeContext } from './Context/ThemeContext';
import './assets/styles/App.css';

function App() {
  console.log('rendu App');

  // Accès au contexte du thème
  const context = useContext(ThemeContext);

  // Vérification que le contexte est défini
  if (!context) {
    throw new Error('App doit être utilisé dans un ThemeProvider');
  }

  const { theme } = context;

  // Styles conditionnels basés sur le thème
  const containerStyles: React.CSSProperties = {
    backgroundColor: theme === 'light' ? '#FFFFFF' : '#121212',
    color: theme === 'light' ? '#000000' : '#FFFFFF',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
  };

  const navStyles: React.CSSProperties = {
    backgroundColor: theme === 'light' ? '#f4f4f4' : '#1f1f1f',
    padding: '10px',
    borderBottom: theme === 'light' ? '1px solid #ddd' : '1px solid #333',
    transition: 'background-color 0.3s ease, border-bottom 0.3s ease',
  };

  const linkStyles: React.CSSProperties = {
    marginRight: '1rem',
    color: theme === 'light' ? '#007BFF' : '#66B2FF',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyles} className="grid-container">
      <Header />
      <nav style={navStyles}>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
          <li>
            <Link to="/" style={linkStyles}>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/todos" style={linkStyles}>
              Liste de Tâches
            </Link>
          </li>
        </ul>
      </nav>
      <main className="main-content" style={{ flex: 1, padding: '20px' }}>
        <ThemeToggleButton />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/todos/:id" element={<TodoDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
