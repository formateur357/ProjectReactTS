// import { useState } from 'react';

import Greeting from './components/Greeting';

function App() {
  // const [count, setCount] = useState(0);

  return (
    /* Utilisation du composant Greeting avec différentes valeurs pour la prop 'name' */
    <div>
      <Greeting name="Bob" />
      <Greeting name="Marie" />
      <Greeting name="Jean-Claude" />
    </div>
  );
}

export default App;
