// src/components/TodoItem.tsx

import React, {
  useContext,
  FormEvent,
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  // useEffect,
  // useRef,
} from 'react';
import { TodoItemInterface } from '../models/TodoItem.model';
import { Link } from 'react-router-dom';
import { useTodoDispatch } from '../Context/TodoDispatchContext';
import { ThemeContext } from '../Context/ThemeContext';
import { heavyComputation } from '../utils/heavyComputation';

interface TodoItemProps {
  todo: TodoItemInterface;
  // onDelete: (id: number) => {};
}

const TodoItem = React.memo(({ todo }: TodoItemProps): JSX.Element => {
  const { toggleTodo, deleteTodo, editTodo } = useTodoDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const context = useContext(ThemeContext);
  const inputRef = useRef<HTMLInputElement>(null);

  // Compteur de re-rendus
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Simuler une opération coûteuse
  const computedValue = heavyComputation(1000);

  // const itemRef = useRef<HTMLLIElement>(null);

  // Vérification que le contexte est défini
  if (!context) {
    throw new Error('TodoItem doit être utilisé dans un ThemeProvider');
  }

  const { theme } = context;

  // Styles conditionnels basés sur le thème
  const liStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: theme === 'light' ? '#f9f9f9' : '#2c2c2c',
    marginBottom: '5px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };

  const inputStyles: React.CSSProperties = {
    marginRight: '10px',
    cursor: 'pointer',
  };

  const spanStyles: React.CSSProperties = {
    flexGrow: 1,
    textDecoration: todo.completed ? 'line-through' : 'none',
    color: theme === 'light' ? '#000' : '#fff',
  };

  const buttonStyles: React.CSSProperties = {
    marginLeft: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '3px',
    border: 'none',
    backgroundColor: theme === 'light' ? '#007BFF' : '#555',
    color: '#fff',
    transition: 'background-color 0.3s ease',
  };

  const handleDeleteTodo = () => {
    const confirmDelete = window.confirm(
      `Voulez-vous vraiment supprimer "${todo.title}" ?`,
    );
    if (confirmDelete) {
      deleteTodo(todo.id);
    }
  };

  const handleEditSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle) {
      editTodo(todo.id, trimmedTitle);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <li style={liStyles}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        aria-label="Marquer cette tâche comme complétée ou non"
        style={inputStyles}
      />
      {isEditing ? (
        <form onSubmit={handleEditSubmit} style={{ flexGrow: 1 }}>
          <input
            ref={inputRef}
            type="text"
            value={editTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEditTitle(e.target.value)
            }
            autoFocus
            style={{
              padding: '5px',
              width: '100%',
              borderRadius: '3px',
              border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
              backgroundColor: theme === 'light' ? '#fff' : '#444',
              color: theme === 'light' ? '#000' : '#fff',
              transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
          />
        </form>
      ) : (
        <Link
          to={`/todos/${todo.id}`}
          style={{ textDecoration: 'none', flexGrow: 1 }}
        >
          <span style={spanStyles}>{todo.title}</span> (Computed:{' '}
          {computedValue})
        </Link>
      )}
      {/* Bouton Éditer ou Enregistrer */}
      {isEditing ? (
        <button
          type="submit"
          onClick={handleEditSubmit}
          aria-label="Enregistrer la modification"
          style={buttonStyles}
        >
          💾
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          aria-label="Éditer cette tâche"
          style={buttonStyles}
        >
          ✏️
        </button>
      )}

      <button onClick={handleDeleteTodo} style={buttonStyles}>
        🗑️
      </button>
    </li>
  );
});

export default TodoItem;
