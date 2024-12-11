// src/components/TimerComponent.tsx

import React, { useState, useRef, useEffect } from 'react';

export const TimerComponent: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current !== null) return; // Timer déjà en cours
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current === null) return;
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    // Nettoyage lors du démontage du composant
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <p>Temps écoulé: {seconds} secondes</p>
      <button onClick={startTimer} disabled={timerRef.current !== null}>
        Démarrer
      </button>
      <button onClick={stopTimer} disabled={timerRef.current === null}>
        Arrêter
      </button>
    </div>
  );
};

export default TimerComponent;
