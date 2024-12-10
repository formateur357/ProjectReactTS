// src/components/LoginButton.tsx
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const LoginButton: React.FC = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("LoginButton doit être utilisé dans un UserProvider");
  }

  const { login } = context;

  const handleLogin = () => {
    // Simuler une authentification
    login("Jean Dupont", "jean.dupont@example.com");
  };

  return <button onClick={handleLogin}>Se Connecter</button>;
};

export default LoginButton;
