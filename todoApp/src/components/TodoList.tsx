import { useEffect, useState } from 'react';

import { TodoItemInterface as TodoIt } from '../models/TodoItem.model.tsx';
import TodoItem from './TodoItem.tsx';
import TextInput from './TextInput.tsx';

function TodoList() {
  const [todos, setTodos] = useState<TodoIt[]>([
    { id: 1, title: 'Apprendre React', completed: false },
    { id: 2, title: 'Decouvrir typescript', completed: true },
  ]);

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
      <TextInput />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
