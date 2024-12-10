import React, { useState } from "react"; // Importation de React et du hook useState depuis la bibliothèque React
import { useTodo } from "./useTodo"; // Importation du hook personnalisé useTodo pour gérer les tâches

// Définition du composant fonctionnel TodoList
const TodoList = () => {
  // Utilisation du hook personnalisé useTodo pour obtenir l'état des tâches et les fonctions pour les manipuler
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();

  // Déclaration de l'état local newTask pour stocker la valeur de l'input de nouvelle tâche
  const [newTask, setNewTask] = useState("");

  // Fonction pour gérer l'ajout d'une nouvelle tâche
  const handleAddTodo = () => {
    // Vérifie si l'input n'est pas vide après avoir supprimé les espaces inutiles
    if (newTask.trim()) {
      addTodo(newTask); // Ajoute la nouvelle tâche en utilisant la fonction addTodo du hook useTodo
      setNewTask(""); // Réinitialise l'input après l'ajout
    }
  };

  return (
    <div>
      <h1>To-Do List</h1> {/* Titre principal de la liste de tâches */}
      {/* Section pour ajouter une nouvelle tâche */}
      <div>
        <input
          type="text"
          value={newTask} // Liaison de l'input avec l'état newTask
          onChange={(e) => setNewTask(e.target.value)} // Met à jour l'état newTask à chaque changement dans l'input
          placeholder="Add a new task" // Texte indicatif dans l'input
        />
        <button onClick={handleAddTodo}>Add</button>{" "}
        {/* Bouton pour ajouter la tâche en appelant handleAddTodo */}
      </div>
      {/* Liste des tâches */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {" "}
            {/* Utilisation de l'id unique de la tâche comme clé pour chaque élément de la liste */}
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none", // Applique une barre sur le texte si la tâche est complétée
                cursor: "pointer", // Change le curseur en pointeur pour indiquer que l'élément est cliquable
              }}
              onClick={() => toggleTodo(todo.id)} // Appelle la fonction toggleTodo avec l'id de la tâche lorsqu'on clique sur le texte
            >
              {todo.text} {/* Affiche le texte de la tâche */}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>{" "}
            {/* Bouton pour supprimer la tâche en appelant deleteTodo avec l'id */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList; // Exportation du composant TodoList pour l'utiliser dans d'autres parties de l'application
