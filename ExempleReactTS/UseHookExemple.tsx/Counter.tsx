import React from "react"; // Importation de React pour créer des composants
import { useCounter } from "./useCounter"; // Importation du hook personnalisé useCounter

/**
 * Composant fonctionnel Counter
 *
 * Utilise le hook personnalisé `useCounter` pour gérer l'état d'un compteur.
 * Affiche la valeur actuelle du compteur et fournit des boutons pour l'incrémenter,
 * le décrémenter et le réinitialiser.
 */
function Counter(): JSX.Element {
  // Utilisation du hook personnalisé useCounter avec une valeur initiale de 0
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      {/* Affichage de la valeur actuelle du compteur */}
      <h1>Count: {count}</h1>

      {/* Bouton pour incrémenter le compteur */}
      <button onClick={increment}>Increment</button>

      {/* Bouton pour décrémenter le compteur */}
      <button onClick={decrement}>Decrement</button>

      {/* Bouton pour réinitialiser le compteur à sa valeur initiale */}
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter; // Exportation du composant Counter pour l'utiliser dans d'autres fichiers
