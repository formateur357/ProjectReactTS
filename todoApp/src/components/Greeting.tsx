import React from 'react';

// definition de l'interface pour les props
interface GreetingProps {
  name: string;
}

const Greeting = ({ name }: GreetingProps): React.JSX.Element => {
  return (
    <div>
      <h1>Bonjour {name} !</h1>
    </div>
  );
};

export default Greeting;
