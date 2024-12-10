// src/components/TodoList.tsx

import { useContext } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { useTodoState } from '../Context/TodoStateContext';
import { useTodoDispatch } from '../Context/TodoDispatchContext';
import { ThemeContext } from '../Context/ThemeContext';

function TodoList() {
  const { filteredTodos, filter } = useTodoState();
  const { setFilter } = useTodoDispatch();
  const context = useContext(ThemeContext);

  // Vérification que le contexte est défini
  if (!context) {
    throw new Error('TodoList doit être utilisé dans un ThemeProvider');
  }

  const { theme } = context;

  // Styles conditionnels basés sur le thème
  const buttonStyles = (currentFilter: string) => ({
    marginRight: '0.5rem',
    backgroundColor:
      filter === currentFilter ? (theme === 'light' ? '#ddd' : '#555') : '#fff',
    color: theme === 'light' ? '#000' : '#fff',
    border: '1px solid #ccc',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '3px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  });

  return (
    <div>
      <AddTodo />
      {/* Section des filtres */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setFilter('all')} style={buttonStyles('all')}>
          Toutes
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={buttonStyles('completed')}
        >
          Complétées
        </button>
        <button
          onClick={() => setFilter('incomplete')}
          style={buttonStyles('incomplete')}
        >
          Incomplètes
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
