// src/hooks/useTodos.ts

import { useState, useEffect } from 'react';
import { TodoItemInterface } from '../models/TodoItem.model';

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
}

type FilterType = 'all' | 'completed' | 'incomplete';

const todoList: TodoItemInterface[] = [
  { id: 1, title: 'Apprendre React', completed: false },
  { id: 2, title: 'Découvrir TypeScript', completed: true },
];

// Hook personnalisé pour gérer les tâches
function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<TodoItemInterface[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos && storedTodos != '[]') {
      try {
        const parsedTodos: TodoItemInterface[] = JSON.parse(storedTodos);
        setTodos(parsedTodos);
      } catch (e) {
        console.error(
          'Erreur lors du parsing des todos depuis le local storage.',
          e,
        );
        // Définir les todos par défaut en cas d'erreur de parsing
        setTodos(todoList);
      }
    } else {
      // Définir les todos par défaut si aucun todo n'est trouvé dans le localStorage
      setTodos(todoList);
    }
  }, []); // Exécute cet effet une seule fois au montage du composant

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); //cet effet s'executee a chaque changement de 'todos'

  // Fonction pour ajouter une nouvelle tâche
  const addTodo = (title: string) => {
    if (title.trim() === '') return;

    const newTodo: TodoItemInterface = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Fonction pour supprimer une tâche
  const deleteTodo = (id: number) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (!todoToDelete) return;

    const confirmDelete = window.confirm(
      `Voulez-vous vraiment supprimer "${todoToDelete.title}" ?`,
    );
    if (confirmDelete) {
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    }
  };

  // Fonction pour basculer l'état 'completed' d'une tâche
  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Fonction pour éditer le titre d'une tâche
  const editTodo = (id: number, newTitle: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo,
      ),
    );
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
  };
}

export default useTodos;
