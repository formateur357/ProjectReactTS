// src/components/TodoDetail.tsx

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useTodos from '../Hooks/useTodos';
import { ThemeContext } from '../Context/ThemeContext';

interface TodoDetailProps {}

function TodoDetail() {
  const { todos } = useTodos();
  const { id } = useParams<{ id: string }>();
  const todo = id !== '' ? todos.find((t) => t.id === Number(id)) : undefined;
  const context = useContext(ThemeContext);

  // Vérification que le contexte est défini
  if (!context) {
    throw new Error('TodoDetail doit être utilisé dans un ThemeProvider');
  }

  const { theme } = context;

  // Styles conditionnels basés sur le thème
  const detailStyles: React.CSSProperties = {
    backgroundColor: theme === 'light' ? '#f9f9f9' : '#2c2c2c',
    color: theme === 'light' ? '#000000' : '#FFFFFF',
    padding: '20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  return (
    <div style={detailStyles}>
      <h2>Détails de la Tâche</h2>
      {todo ? (
        <>
          <p>
            <strong>ID:</strong> {todo.id}
          </p>
          <p>
            <strong>Titre:</strong> {todo.title}
          </p>
          <p>
            <strong>Complétée:</strong> {todo.completed ? 'Oui' : 'Non'}
          </p>
        </>
      ) : (
        <p>Tâche non trouvée.</p>
      )}
    </div>
  );
}

export default TodoDetail;
