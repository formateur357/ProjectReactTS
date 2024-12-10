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

function TodoList() {
  const [todos, setTodos] = useState<TodoIt[]>([]);

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
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
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
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
