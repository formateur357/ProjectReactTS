interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
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
