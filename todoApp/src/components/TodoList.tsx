import { FormEvent, useEffect, useState } from 'react';

import {
  TodoItemInterface as TodoIt,
  TodoItemInterface,
} from '../models/TodoItem.model.tsx';
import TodoItem from './TodoItem.tsx';
import AddTodo from './AddTodo.tsx';

function TodoList() {
  const [todos, setTodos] = useState<TodoIt[]>([
    { id: 1, title: 'Apprendre React', completed: false },
    { id: 2, title: 'Decouvrir typescript', completed: true },
  ]);

  function handleToggleTodo(id: number) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function handleAddTodo(title: string) {
    const newTodo: TodoItemInterface = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []); // Tableau de dependances vide : cet effet s'execute une seule fois au montage du composant

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
