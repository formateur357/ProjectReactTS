import TodoItem from './TodoItem.tsx';
import AddTodo from './AddTodo.tsx';
import { useTodoState } from '../Context/TodoStateContext.tsx';
import { useTodoDispatch } from '../Context/TodoDispatchContext.tsx';

function TodoList() {
  const { filteredTodos, filter } = useTodoState();
  const { setFilter } = useTodoDispatch();

  return (
    <div>
      <AddTodo />
      {/* Section des filtres */}
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            marginRight: '0.5rem',
            backgroundColor: filter === 'all' ? '#ddd' : '#fff',
          }}
        >
          Toutes
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={{
            marginRight: '0.5rem',
            backgroundColor: filter === 'completed' ? '#ddd' : '#fff',
          }}
        >
          Complétées
        </button>
        <button
          onClick={() => setFilter('incomplete')}
          style={{
            backgroundColor: filter === 'incomplete' ? '#ddd' : '#fff',
          }}
        >
          Incomplètes
        </button>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
