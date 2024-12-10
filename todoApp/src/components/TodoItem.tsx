import { FormEvent, useState, ChangeEvent } from 'react';
import { TodoItemInterface } from '../models/TodoItem.model';
import { Link } from 'react-router-dom';

interface TodoItemProps {
  todo: TodoItemInterface;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, title: string) => void;
}

function TodoItem({
  todo,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleEditSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle) {
      onEditTodo(todo.id, trimmedTitle);
      setIsEditing(false);
    }
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
        aria-label="Marquer cette tâche comme complétée ou non"
      />
      {isEditing ? (
        <form onSubmit={handleEditSubmit} style={{ flexGrow: 1 }}>
          <input
            type="text"
            value={editTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEditTitle(e.target.value)
            }
            autoFocus
          />
        </form>
      ) : (
        <Link to={`/todos/${todo.id}`}>
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.title}
          </span>
        </Link>
      )}
      {/* Bouton Éditer ou Enregistrer */}
      {isEditing ? (
        <button
          type="submit"
          onClick={handleEditSubmit}
          aria-label="Enregistrer la modification"
        >
          💾
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          aria-label="Éditer cette tâche"
        >
          ✏️
        </button>
      )}

      <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
