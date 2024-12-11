// src/hooks/useTodos.tsx

import { useReducer, useEffect } from 'react';
import { TodoItemInterface } from '../models/TodoItem.model';
import { heavyComputation } from '../utils/heavyComputation';

// Types définis précédemment
type FilterType = 'all' | 'completed' | 'incomplete';

interface State {
  todos: TodoItemInterface[];
  filter: FilterType;
}

type Action =
  | { type: 'INITIALIZE'; payload: TodoItemInterface[] }
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'EDIT_TODO'; payload: { id: number; title: string } }
  | { type: 'RESET_TODOS'; payload: TodoItemInterface[] };

// Reducer défini précédemment
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, todos: action.payload };

    case 'ADD_TODO': {
      if (action.payload.trim() === '') return state;

      const newTodo: TodoItemInterface = {
        id: Date.now(),
        title: action.payload.trim(),
        completed: false,
      };
      return { ...state, todos: [...state.todos, newTodo] };
    }

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    case 'RESET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    default:
      return state;
  }
};

// Définir les todos par défaut
const defaultTodos: TodoItemInterface[] = [
  { id: 1, title: 'Apprendre React', completed: false },
  { id: 2, title: 'Découvrir TypeScript', completed: true },
];

// Définir le type de retour du hook
interface UseTodosReturn {
  todos: TodoItemInterface[];
  filter: FilterType;
  filteredTodos: TodoItemInterface[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
  setFilter: (filter: FilterType) => void;
  resetTodos: () => void;
}

// Hook personnalisé pour gérer les tâches et les filtres
const useTodos = (): UseTodosReturn => {
  const initialState: State = {
    todos: [],
    filter: 'all',
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { todos, filter } = state;

  // Initialisation des todos depuis le localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos && storedTodos !== '[]') {
      try {
        const parsedTodos: TodoItemInterface[] = JSON.parse(storedTodos);
        dispatch({ type: 'INITIALIZE', payload: parsedTodos });
      } catch (e) {
        console.error(
          'Erreur lors du parsing des todos depuis le local storage.',
          e,
        );
        // Définir les todos par défaut en cas d'erreur de parsing
        dispatch({ type: 'INITIALIZE', payload: defaultTodos });
      }
    } else {
      // Définir les todos par défaut si aucun todo n'est trouvé dans le localStorage
      dispatch({ type: 'INITIALIZE', payload: defaultTodos });
    }
  }, []);

  // Synchronisation des todos avec le localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Actions
  const addTodo = (title: string) => {
    if (title.trim()) dispatch({ type: 'ADD_TODO', payload: title });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const editTodo = (id: number, newTitle: string) => {
    if (newTitle.trim()) {
      dispatch({ type: 'EDIT_TODO', payload: { id, title: newTitle } });
    }
  };

  const setFilter = (filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const resetTodos = () => {
    dispatch({ type: 'RESET_TODOS', payload: defaultTodos });
  };

  // Fonction pour obtenir les tâches filtrées
  const getFilteredTodos = (): TodoItemInterface[] => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'incomplete':
        return todos.filter((todo) => !todo.completed);
      case 'all':
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return {
    todos,
    filter,
    filteredTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    setFilter,
    resetTodos,
  };
};

export default useTodos;
