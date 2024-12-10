import React from "react";

// Un composant fonctionnel simple nommé "HelloWorld"
function HelloWorld(): JSX.Element {
  // Ce composant retourne du JSX, qui ressemble à du HTML, mais c'est du TypeScript + JSX (TSX).
  // Le type JSX.Element indique explicitement que la fonction retourne du JSX. Cela évite d'utiliser React.FC.

  return (
    <div>
      <h1>Hello, world!</h1>
      <p>Ceci est mon premier composant React fonctionnel en TypeScript.</p>
    </div>
  );
}

export default HelloWorld;
