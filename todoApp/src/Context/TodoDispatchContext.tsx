// src/contexts/TodoDispatchContext.tsx

import { createContext, useContext } from 'react';

// Définir le type pour les actions
interface TodoDispatch {
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
  setFilter: (filter: 'all' | 'completed' | 'incomplete') => void;
  resetTodos: () => void;
}

// Créer le contexte avec un dispatch par défaut vide
const TodoDispatchContext = createContext<TodoDispatch | undefined>(undefined);

// Hook personnalisé pour consommer le contexte de dispatch
export const useTodoDispatch = (): TodoDispatch => {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('useTodoDispatch must be used within a TodoProvider');
  }
  return context;
};

export default TodoDispatchContext;
