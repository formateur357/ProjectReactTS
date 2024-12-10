import React, { useState, useEffect, FormEvent } from "react";
import TodoItem from "./TodoItem";
import { TodoItemInterface } from "../models/TodoItem.model";

// Définition du type pour les filtres disponibles
type FilterType = "all" | "completed" | "incomplete";

function TodoList() {
  // État pour stocker la liste des tâches
  const [todos, setTodos] = useState<TodoItemInterface[]>([]);
  // État pour gérer la valeur de l'input pour ajouter une tâche
  const [inputValue, setInputValue] = useState("");
  // État pour gérer le filtre actuellement sélectionné
  const [filter, setFilter] = useState<FilterType>("all");

  // Charger les tâches depuis le localStorage au montage du composant
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        const parsedTodos: TodoItemInterface[] = JSON.parse(storedTodos);
        setTodos(parsedTodos); // Initialise les tâches avec les données stockées
      } catch (error) {
        console.error(
          "Erreur lors du parsing des todos depuis le localStorage:",
          error
        );
      }
    }
  }, []); // Vide = cette fonction est appelée uniquement au montage

  // Sauvegarder les tâches dans le localStorage à chaque mise à jour de 'todos'
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // Déclenchement uniquement lorsque 'todos' change

  // Ajouter une nouvelle tâche
  function handleAddTodo(event: FormEvent) {
    event.preventDefault(); // Empêche le rechargement de la page
    if (inputValue.trim() === "") return; // Ignore si l'input est vide

    const newTodo: TodoItemInterface = {
      id: Date.now(), // Génère un identifiant unique basé sur la date actuelle
      title: inputValue.trim(), // Supprime les espaces inutiles
      completed: false, // Par défaut, la tâche n'est pas complétée
    };

    setTodos([...todos, newTodo]); // Ajoute la nouvelle tâche à la liste
    setInputValue(""); // Réinitialise l'input après l'ajout
  }

  // Basculer l'état d'achèvement d'une tâche
  function handleToggleTodo(id: number) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Supprimer une tâche avec confirmation
  function handleDeleteTodo(id: number) {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (!todoToDelete) return;

    const confirmDelete = window.confirm(
      `Voulez-vous vraiment supprimer "${todoToDelete.title}" ?`
    );
    if (confirmDelete) {
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    }
  }

  // Modifier le titre d'une tâche
  function handleEditTodo(id: number, newTitle: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  }

  // Retourne les tâches filtrées en fonction de l'état du filtre
  function getFilteredTodos(): TodoItemInterface[] {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed); // Tâches complétées
      case "incomplete":
        return todos.filter((todo) => !todo.completed); // Tâches incomplètes
      case "all":
      default:
        return todos; // Toutes les tâches
    }
  }

  return (
    <div>
      {/* Formulaire pour ajouter une nouvelle tâche */}
      <form onSubmit={handleAddTodo} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={inputValue} // Liaison avec l'état 'inputValue'
          onChange={(e) => setInputValue(e.target.value)} // Met à jour l'état à chaque changement
        />
        <button type="submit">Ajouter</button>
      </form>

      {/* Section des filtres */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            marginRight: "0.5rem",
            backgroundColor: filter === "all" ? "#ddd" : "#fff",
          }}
        >
          Toutes
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            marginRight: "0.5rem",
            backgroundColor: filter === "completed" ? "#ddd" : "#fff",
          }}
        >
          Complétées
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          style={{
            backgroundColor: filter === "incomplete" ? "#ddd" : "#fff",
          }}
        >
          Incomplètes
        </button>
      </div>

      {/* Liste des tâches affichées en fonction du filtre */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {getFilteredTodos().map((todo) => (
          <TodoItem
            key={todo.id} // Clé unique pour chaque tâche
            todo={todo} // Les données de la tâche
            onToggleTodo={handleToggleTodo} // Fonction pour basculer l'état
            onDeleteTodo={handleDeleteTodo} // Fonction pour supprimer la tâche
            onEditTodo={handleEditTodo} // Fonction pour modifier la tâche
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
