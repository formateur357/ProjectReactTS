import React from "react";

// Un composant fonctionnel simple nommé "HelloWorld"
function HelloWorld() {
  // Ce composant retourne du JSX, qui ressemble à du HTML, mais c'est du JavaScript.
  // Ce code sera transformé et affiché dans le navigateur par React.
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>Ceci est mon premier composant React fonctionnel.</p>
    </div>
  );
}

export default HelloWorld;

/* Commentaires :

Ici, HelloWorld est une fonction JavaScript simple, qui retourne du JSX.
Le JSX est une extension de la syntaxe JavaScript qui permet d’écrire des balises proches du HTML.

Sous le capot, ce JSX est transformé en appels à React.createElement, ce qui construit une représentation interne (un "Virtual DOM") que React peut utiliser pour mettre à jour l’écran de manière optimale.

Ce qu’il faut retenir :

- Un composant React : une fonction qui retourne du JSX.

- L’approche déclarative : on décrit l’UI à partir de l’état, React s’occupe du "comment" mettre à jour le DOM.

- On va beaucoup s’appuyer sur les Hooks et les composants fonctionnels, c’est la méthode moderne et recommandée.

Bonnes pratiques et astuces :

- Toujours nommer les composants avec une majuscule : HelloWorld, MyButton, TaskItem.

- Un composant doit idéalement être une "pure function" de ses props : cela signifie qu’il ne modifie pas directement celles-ci et qu’il retourne toujours le même rendu pour les mêmes props.

- Limiter la logique dans un composant s’il devient trop long ou trop complexe. Dans ce cas, on peut le scinder en plusieurs composants plus simples.
*/
