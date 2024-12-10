import React from "react";

// Le composant Greeting reçoit des props, parmi lesquelles 'name'
function Greeting(props) {
  // On récupère la prop 'name' depuis l'objet props
  const { name } = props;

  // Le composant retourne un élément JSX
  // Ici, on affiche Bonjour {name} dans un titre h1.
  return (
    <div>
      <h1>Bonjour {name} !</h1>
    </div>
  );
}

export default Greeting;

/* Commentaires :

- On définit une fonction Greeting (première lettre en majuscule, c’est une convention dans React).
- props est un objet qui contient toutes les propriétés passées au composant. Ici, on s’attend à ce qu’il ait props.name.
- On déstructure props en { name } pour un code plus clair.
- Le JSX renvoyé est un simple div contenant un h1 avec le texte « Bonjour {name}! ».
*/
