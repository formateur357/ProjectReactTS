// src/contexts/TodoProvider.tsx

import React from 'react';
import TodoStateContext from './TodoStateContext';
import TodoDispatchContext from './TodoDispatchContext';
import useTodos from '../Hooks/useTodos';
import { TodoItemInterface } from '../models/TodoItem.model';

// Définir les types pour les filtres
type FilterType = 'all' | 'completed' | 'incomplete';

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

interface TodoProviderProps {
  children: React.ReactNode;
}

const TodoProvider = ({ children }: TodoProviderProps): JSX.Element => {
  const {
    todos,
    filter,
    filteredTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    setFilter,
    resetTodos,
  }: UseTodosReturn = useTodos();

  return (
    <TodoStateContext.Provider value={{ todos, filter, filteredTodos }}>
      <TodoDispatchContext.Provider
        value={{
          addTodo,
          deleteTodo,
          toggleTodo,
          editTodo,
          setFilter,
          resetTodos,
        }}
      >
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export default TodoProvider;
