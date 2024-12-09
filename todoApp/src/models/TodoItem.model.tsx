export interface TodoItemInterface {
  id: number;
  title: string;
  completed: boolean;
}

// On crée une variable myTask qui suit la structure définie par TodoItem
const myTask: TodoItemInterface = {
  id: 0,
  title: 'Apprendre Typescript',
  completed: false,
};

// La fonction toggleTodo prend en paramètre une tâche (todo)
// et retourne un nouvel objet TodoItem où completed est inversé.
function toggleTodo(todo: TodoItemInterface): TodoItemInterface {
  // On utilise l’opérateur de décomposition (...) pour créer une copie de todo
  // puis on modifie la propriété completed.
  return {
    ...todo,
    completed: !todo.completed,
  };
}

// Exemple d’utilisation
const updatedTask = toggleTodo(myTask);
console.log(updatedTask);
// Affichera : { id: 1, title: "Apprendre TypeScript", completed: true }
