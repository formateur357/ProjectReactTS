// src/App.tsx
import React from "react";
import UserProfile from "./components/UserProfile";
import LoginButton from "./components/LoginButton";

const App: React.FC = () => {
  return (
    <div>
      <h1>Bienvenue dans l'Application Utilisateur</h1>
      <UserProfile />
      <LoginButton />
    </div>
  );
};

export default App;
