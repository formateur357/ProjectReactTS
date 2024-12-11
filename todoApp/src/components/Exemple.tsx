import React, { useState, useRef } from 'react';

export const ExampleComponent = (): JSX.Element => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const incrementState = () => setCount(count + 1);
  const incrementRef = () => {
    countRef.current += 1;
    console.log('CountRef:', countRef.current);
  };

  return (
    <div>
      <p>useState Count: {count}</p>
      <button onClick={incrementState}>Increment useState</button>
      <p>useRef Count: {countRef.current}</p>
      <button onClick={incrementRef}>Increment useRef</button>
    </div>
  );
};
