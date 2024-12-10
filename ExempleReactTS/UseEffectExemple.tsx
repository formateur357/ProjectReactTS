import React, { useState, useEffect } from "react";

function Counter() {
  // Déclaration de l'état 'count' avec une valeur initiale de 0
  const [count, setCount] = useState(0);

  // Utilisation de useEffect pour mettre en place un effet secondaire (timer)
  useEffect(() => {
    // Crée un intervalle qui s'exécute toutes les 1000 millisecondes (1 seconde)
    const intervalId = setInterval(() => {
      // Met à jour l'état 'count' en l'incrémentant de 1
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // Fonction de nettoyage qui est appelée lorsque le composant est démonté
    return () => {
      clearInterval(intervalId); // Supprime l'intervalle pour éviter les fuites de mémoire
    };
  }, []); // Tableau de dépendances vide : cet effet s'exécute une seule fois au montage

  // Rendu du composant : affiche la valeur actuelle du compteur
  return <div>Compteur : {count}</div>;
}

export default Counter;
