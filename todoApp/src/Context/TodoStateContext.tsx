// src/contexts/TodoStateContext.tsx

import { createContext, useContext } from 'react';
import { TodoItemInterface } from '../models/TodoItem.model';

// Définir le type pour le contexte d'état
interface TodoState {
  todos: TodoItemInterface[];
  filter: 'all' | 'completed' | 'incomplete';
  filteredTodos: TodoItemInterface[];
}

// Créer le contexte avec un état par défaut
const TodoStateContext = createContext<TodoState | undefined>(undefined);

// Hook personnalisé pour consommer le contexte d'état
export const useTodoState = (): TodoState => {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('useTodoState must be used within a TodoProvider');
  }
  return context;
};

export default TodoStateContext;
