import { TodoItemInterface } from '../models/TodoItem.model';

interface TodoItemProps {
  todo: TodoItemInterface;
}

function TodoItem({ todo }: TodoItemProps) {
  return (
    <li>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.title}
      </span>
    </li>
  );
}

export default TodoItem;
