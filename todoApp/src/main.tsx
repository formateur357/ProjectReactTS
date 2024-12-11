import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from './Context/ThemeContext.tsx';
import TodoProvider from './Context/TodoProvider';
import App from './App.tsx';
import AuthProvider from './Context/AuthProvider';
// import { TimerComponent } from './components/Exemple.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <TodoProvider>
            <App />
            {/* <TimerComponent></TimerComponent> */}
          </TodoProvider>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
