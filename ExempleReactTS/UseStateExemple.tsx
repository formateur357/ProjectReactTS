import React, { useState } from "react";

function Counter(): JSX.Element {
  // Déclare une variable d'état 'count' initialisée à 0
  const [count, setCount] = useState<number>(0);

  // Fonction pour incrémenter le compteur
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Fonction pour réinitialiser le compteur
  const reset = () => {
    setCount(0);
  };

  return (
    <div style={styles.container}>
      <h1>Compteur : {count}</h1>
      <button style={styles.button} onClick={increment}>
        Incrémenter
      </button>
      <button style={styles.button} onClick={reset}>
        Réinitialiser
      </button>
    </div>
  );
}

// Quelques styles inline pour le composant
const styles = {
  container: {
    textAlign: "center" as const,
    marginTop: "2rem",
  },
  button: {
    margin: "0.5rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default Counter;
