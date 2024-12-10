import { useState } from "react";

/**
 * Hook personnalisé pour gérer un compteur.
 *
 * @param initialValue - La valeur initiale du compteur (par défaut à 0).
 * @returns Un objet contenant la valeur actuelle du compteur et des fonctions pour l'incrémenter, le décrémenter et le réinitialiser.
 */
export const useCounter = (initialValue: number = 0) => {
  // Déclaration de l'état 'count' avec la valeur initiale fournie
  const [count, setCount] = useState(initialValue);

  /**
   * Incrémente la valeur du compteur de 1.
   */
  const increment = () => setCount((prev) => prev + 1);

  /**
   * Décrémente la valeur du compteur de 1.
   */
  const decrement = () => setCount((prev) => prev - 1);

  /**
   * Réinitialise la valeur du compteur à la valeur initiale.
   */
  const reset = () => setCount(initialValue);

  // Retourne l'état actuel et les fonctions pour manipuler le compteur
  return { count, increment, decrement, reset };
};
