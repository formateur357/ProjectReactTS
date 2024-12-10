import React from 'react';

// definition de l'interface pour les props
interface GreetingProps {
  isLoggedIn: boolean;
  name?: string; // prop optionnel
}

const Greeting = ({
  isLoggedIn = true,
  name,
}: GreetingProps): React.JSX.Element => {
  return (
    <div>
      {isLoggedIn ? <h1>Bonjour toi !</h1> : <h1>Bonjour invite !</h1>}
      {isLoggedIn && name && <h2>{name}</h2>}
    </div>
  );
};

export default Greeting;
