import { useReducer } from "react"; // Importation du hook useReducer depuis React

// Définition de l'interface pour une tâche (Todo)
interface Todo {
  id: number; // Identifiant unique de la tâche
  text: string; // Texte ou description de la tâche
  completed: boolean; // État d'achèvement de la tâche (true = complétée, false = incomplète)
}

// Définition des types d'actions possibles pour le reducer
type Action =
  | { type: "ADD_TODO"; payload: string } // Action pour ajouter une nouvelle tâche, payload est le texte de la tâche
  | { type: "TOGGLE_TODO"; payload: number } // Action pour basculer l'état d'une tâche, payload est l'id de la tâche
  | { type: "DELETE_TODO"; payload: number }; // Action pour supprimer une tâche, payload est l'id de la tâche

/**
 * Reducer pour gérer l'état des tâches.
 *
 * @param state - L'état actuel, qui est un tableau de tâches (Todo[])
 * @param action - L'action à effectuer, définie par le type Action
 * @returns Le nouvel état après application de l'action
 */
const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state, // Copie de l'état actuel des tâches
        {
          id: Date.now(), // Génère un identifiant unique basé sur le timestamp actuel
          text: action.payload, // Texte de la nouvelle tâche provenant du payload
          completed: false, // La nouvelle tâche est par défaut non complétée
        },
      ];

    case "TOGGLE_TODO":
      return state.map(
        (todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed } // Inverse l'état 'completed' de la tâche correspondante
            : todo // Laisse les autres tâches inchangées
      );

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload); // Filtre et supprime la tâche dont l'id correspond au payload

    default:
      return state; // Retourne l'état inchangé si l'action n'est pas reconnue
  }
};

/**
 * Hook personnalisé pour gérer les tâches (Todos) en utilisant useReducer.
 *
 * @returns Un objet contenant l'état des tâches et les fonctions pour manipuler les tâches
 */
export const useTodo = () => {
  // Initialisation du useReducer avec le reducer 'todoReducer' et un état initial vide []
  const [todos, dispatch] = useReducer(todoReducer, []);

  /**
   * Fonction pour ajouter une nouvelle tâche.
   *
   * @param text - Le texte de la nouvelle tâche à ajouter
   */
  const addTodo = (text: string) => {
    dispatch({ type: "ADD_TODO", payload: text }); // Envoie une action 'ADD_TODO' avec le texte de la tâche
  };

  /**
   * Fonction pour basculer l'état d'une tâche (complétée/incomplète).
   *
   * @param id - L'identifiant de la tâche à basculer
   */
  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id }); // Envoie une action 'TOGGLE_TODO' avec l'id de la tâche
  };

  /**
   * Fonction pour supprimer une tâche.
   *
   * @param id - L'identifiant de la tâche à supprimer
   */
  const deleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", payload: id }); // Envoie une action 'DELETE_TODO' avec l'id de la tâche
  };

  // Retourne l'état des tâches et les fonctions pour les manipuler
  return { todos, addTodo, toggleTodo, deleteTodo };
};
