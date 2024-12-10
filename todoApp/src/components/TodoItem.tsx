import { TodoItemInterface } from '../models/TodoItem.model';

interface TodoItemProps {
  todo: TodoItemInterface;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

function TodoItem({ todo, onToggleTodo, onDeleteTodo }: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
        aria-label="Marquer cette tâche comme complétée ou non"
      />
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.title}
      </span>
      <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
