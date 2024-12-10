import { TodoItemInterface } from '../models/TodoItem.model';

interface TodoItemProps {
  todo: TodoItemInterface;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

function TodoItem({ todo, onToggleTodo, onDeleteTodo }: TodoItemProps) {
  return (
    <li>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.title}
      </span>
      <button onClick={() => onToggleTodo(todo.id)}>
        {todo.completed ? '⟲' : '✔'}
      </button>
      <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
