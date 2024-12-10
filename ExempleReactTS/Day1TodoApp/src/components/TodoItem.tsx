import React, { useState, ChangeEvent, FormEvent } from "react";
import { TodoItemInterface } from "../models/TodoItem.model";

// Props attendues par le composant TodoItem
interface TodoItemProps {
  todo: TodoItemInterface; // Une tâche unique
  onToggleTodo: (id: number) => void; // Callback pour basculer l'état complet/incomplet
  onDeleteTodo: (id: number) => void; // Callback pour supprimer une tâche
  onEditTodo: (id: number, newTitle: string) => void; // Callback pour éditer une tâche
}

// Composant fonctionnel TodoItem
function TodoItem({
  todo,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false); // État pour gérer si on est en mode édition ou pas
  const [editTitle, setEditTitle] = useState(todo.title); // État pour le titre en cours d'édition

  // Fonction pour gérer la soumission du formulaire d'édition
  const handleEditSubmit = (event: FormEvent) => {
    event.preventDefault(); // Empêche le rechargement de la page
    const trimmedTitle = editTitle.trim(); // Supprime les espaces inutiles autour du titre
    if (trimmedTitle) {
      onEditTodo(todo.id, trimmedTitle); // Appelle la fonction du parent pour mettre à jour la tâche
      setIsEditing(false); // Quitte le mode édition
    }
  };

  return (
    <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      {/* Checkbox pour marquer une tâche comme complète/incomplète */}
      <input
        type="checkbox"
        checked={todo.completed} // Liaison avec l'état d'achèvement
        onChange={() => onToggleTodo(todo.id)} // Appelle la fonction pour basculer l'état
        aria-label="Marquer cette tâche comme complétée ou non"
      />

      {/* Affichage conditionnel du titre ou du champ de saisie en fonction du mode édition */}
      {isEditing ? (
        <form onSubmit={handleEditSubmit} style={{ flexGrow: 1 }}>
          <input
            type="text"
            value={editTitle} // Liaison avec le titre en cours d'édition
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEditTitle(e.target.value)
            } // Met à jour le titre en direct
            autoFocus // Focus automatique pour améliorer l'ergonomie
          />
        </form>
      ) : (
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none", // Barre le texte si la tâche est complétée
            flexGrow: 1, // Le texte occupe tout l'espace restant
          }}
        >
          {todo.title}
        </span>
      )}

      {/* Bouton Éditer ou Enregistrer selon le mode */}
      {isEditing ? (
        <button
          type="submit" // Nécessaire pour la soumission dans le formulaire
          onClick={handleEditSubmit} // Enregistre la modification
          aria-label="Enregistrer la modification"
        >
          💾
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)} // Active le mode édition
          aria-label="Éditer cette tâche"
        >
          ✏️
        </button>
      )}

      {/* Petite barre verticale pour séparer les actions */}
      <span style={{ margin: "0 0.5rem" }}>|</span>

      {/* Bouton Supprimer */}
      <button
        onClick={() => onDeleteTodo(todo.id)} // Appelle la fonction pour supprimer la tâche
        aria-label="Supprimer cette tâche"
      >
        ✘
      </button>
    </li>
  );
}

export default TodoItem;
