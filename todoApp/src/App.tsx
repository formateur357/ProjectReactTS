import { useState } from 'react';

import Greeting from './components/Greeting';

function App() {
  const [count, setCount] = useState<number>(0);

  console.log('rendu');

  const handleIncrement = (): void => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  return (
    /* Utilisation du composant Greeting avec différentes valeurs pour la prop 'name' */
    <div>
      <h2>Compteur: {count}</h2>
      <button onClick={handleIncrement}>Incrementer</button>

      <Greeting isLoggedIn={true} name="Bob" />
    </div>
  );
}

export default App;
