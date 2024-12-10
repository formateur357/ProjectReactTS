import useTodos from '../Hooks/useTodos';
import { useParams } from 'react-router-dom';

interface TodoItemProps {}

function TodoDetail() {
  const { todos } = useTodos();

  const { id } = useParams<{ id: string }>();
  const todo = id !== '' ? todos.find((t) => t.id === Number(id)) : undefined;

  return (
    <div>
      <h2>Détails de la Tâche</h2>
      <p>
        <strong>ID:</strong> {todo?.id}
      </p>
      <p>
        <strong>Titre:</strong> {todo?.title}
      </p>
      <p>
        <strong>Complétée:</strong> {todo?.completed ? 'Oui' : 'Non'}
      </p>
    </div>
  );
}

export default TodoDetail;
