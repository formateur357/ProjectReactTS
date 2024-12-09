import { useState } from 'react';

import { TodoItemInterface as TodoIt } from '../models/TodoITem.model.tsx';
import TodoItem from './TodoItem.tsx';

function TodoList() {
  const [todos, setTodos] = useState<TodoIt[]>([
    { id: 1, title: 'Apprendre React', completed: false },
    { id: 2, title: 'Decouvrir typescript', completed: true },
  ]);

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
