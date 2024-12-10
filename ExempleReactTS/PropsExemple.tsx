// UserCard.tsx

// import React from "react";

// Définition des types pour les props
type UserCardProps = {
  name: string; // Nom de l'utilisateur (obligatoire)
  age?: number; // Âge de l'utilisateur (optionnel)
  onAction: (name: string) => void; // Fonction à exécuter lorsqu'une action est déclenchée
  isFollowing: boolean; // État indiquant si l'utilisateur est suivi ou non
};

const UserCard: React.FC<UserCardProps> = ({
  name,
  age,
  onAction,
  isFollowing,
}) => {
  // Gestion du clic sur le bouton
  const handleClick = () => {
    // Appelle la fonction onAction avec le nom de l'utilisateur.
    // Permet au parent de savoir quel utilisateur a déclenché l'action.
    onAction(name);
  };

  return (
    <div>
      {/* Affiche le nom de l'utilisateur */}
      <h2>{name}</h2>

      {/* Affiche l'âge uniquement si la prop 'age' est fournie */}
      {age && <p>Âge : {age}</p>}

      {/* Bouton pour suivre ou arrêter de suivre. 
          Le texte change dynamiquement en fonction de la prop 'isFollowing'. */}
      <button onClick={handleClick}>
        {isFollowing ? "Arrêter de suivre" : "Suivre"}
      </button>
    </div>
  );
};

// export default UserCard;

/* Explications et conseils sur les props dans UserCard :
Props typées :
Les props sont fortement typées avec UserCardProps, ce qui améliore la sécurité du code.

Conseil : Utilisez ? pour les props optionnelles (age?: number). Cela simplifie leur gestion, notamment avec des données incomplètes.

---------------------------------------------
Passage de fonctions comme props (onAction) :
La fonction onAction permet au composant enfant (UserCard) de communiquer avec son parent (App).

Conseil : Passez uniquement les fonctions nécessaires pour éviter une surcharge de props.

---------------------------------
Dépendance des props dynamiques :
Les données dynamiques comme isFollowing contrôlent l'affichage (texte du bouton).

Conseil : Structurez vos données pour refléter clairement les états nécessaires au rendu.

---------------------------------
Nettoyage des props inutilisées :
Si une prop n'est plus nécessaire, supprimez-la pour réduire la complexité.
*/

// App.tsx

import React, { useState } from "react";
// import UserCard from "./UserCard";

function App(): JSX.Element {
  // Exemple de liste d'utilisateurs
  const [users, setUsers] = useState([
    { name: "Alice", age: 25, isFollowing: false },
    { name: "Bob", age: 30, isFollowing: true },
    { name: "Charlie", isFollowing: false },
  ]);

  // Fonction pour gérer l'action de suivre/arrêter de suivre
  const handleAction = (name: string) => {
    // Met à jour l'état des utilisateurs en inversant la propriété 'isFollowing' pour l'utilisateur correspondant
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === name ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      {/* Boucle sur la liste des utilisateurs pour créer une carte pour chacun */}
      {users.map((user) => (
        <UserCard
          key={user.name} // Clé unique pour chaque composant
          name={user.name} // Nom de l'utilisateur
          age={user.age} // Âge de l'utilisateur
          isFollowing={user.isFollowing} // État 'suivi' ou non
          onAction={handleAction} // Fonction pour gérer le clic sur le bouton
        />
      ))}
    </div>
  );
}

// export default App;

/* Explications et conseils sur les props dans App :
Gestion dynamique des données :
users est un état contenant une liste d'objets représentant les utilisateurs.

Conseil : Maintenez l'état global des données dans le composant parent pour mieux contrôler la logique.

----------------------------------
Passage de fonctions aux enfants :
handleAction est passé comme prop à chaque UserCard. Cela permet au parent de gérer l'état.

Conseil : Gardez la logique complexe dans le parent pour éviter que le composant enfant devienne difficile à maintenir.

--------------------
Utilisation de key :
Chaque composant enfant doit avoir une clé unique (key={user.name}) pour optimiser le rendu par React.

Conseil : Utilisez des valeurs uniques et stables (par ex., id) pour les clés, surtout avec des données dynamiques.

--------------------------
Composants réutilisables :
UserCard peut être utilisé avec différentes données dans d'autres parties de l'application.

Conseil : Gardez les composants enfants génériques et sans dépendances directes à la logique du parent.
*/
