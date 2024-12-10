import { useEffect, useState } from 'react';

import {
  TodoItemInterface as TodoIt,
  TodoItemInterface,
} from '../models/TodoItem.model.tsx';
import TodoItem from './TodoItem.tsx';
import AddTodo from './AddTodo.tsx';

const todoList: TodoItemInterface[] = [
  { id: 1, title: 'Apprendre React', completed: false },
  { id: 2, title: 'Découvrir TypeScript', completed: true },
];

type FilterType = 'all' | 'completed' | 'incomplete';

function TodoList() {
  const [todos, setTodos] = useState<TodoIt[]>([]);
  const [filter, setFilter] = useState<FilterType>('all'); // Nouvel état pour le filtre

  const handleToggleTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleAddTodo = (title: string) => {
    const newTodo: TodoItemInterface = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleDeleteTodo = (id: number) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (!todoToDelete) return;

    const confirmDelete = window.confirm(
      `Voulez-vous vraiment supprimer "${todoToDelete.title}" ?`,
    );
    if (confirmDelete) {
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    }
  };

  const handleEditTodo = (id: number, title: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const getFilteredTodos = (): TodoItemInterface[] => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'incomplete':
        return todos.filter((todo) => !todo.completed);
      case 'all':
      default:
        return todos;
    }
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos && storedTodos != '[]') {
      try {
        const parsedTodos: TodoItemInterface[] = JSON.parse(storedTodos);
        setTodos(parsedTodos);
      } catch (e) {
        console.error(
          'Erreur lors du parsing des todos depuis le local storage.',
          e,
        );
        // Définir les todos par défaut en cas d'erreur de parsing
        setTodos(todoList);
      }
    } else {
      // Définir les todos par défaut si aucun todo n'est trouvé dans le localStorage
      setTodos(todoList);
    }
  }, []); // Exécute cet effet une seule fois au montage du composant

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); //cet effet s'executee a chaque changement de 'todos'

  return (
    <div>
      <AddTodo onAdd={handleAddTodo} />
      {/* Section des filtres */}
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            marginRight: '0.5rem',
            backgroundColor: filter === 'all' ? '#ddd' : '#fff',
          }}
        >
          Toutes
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={{
            marginRight: '0.5rem',
            backgroundColor: filter === 'completed' ? '#ddd' : '#fff',
          }}
        >
          Complétées
        </button>
        <button
          onClick={() => setFilter('incomplete')}
          style={{
            backgroundColor: filter === 'incomplete' ? '#ddd' : '#fff',
          }}
        >
          Incomplètes
        </button>
      </div>
      <ul>
        {getFilteredTodos().map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
            onEditTodo={handleEditTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
