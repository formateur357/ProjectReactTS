import { createContext, useState, ReactNode } from "react";

// Définition de l'interface pour les informations de l'utilisateur
interface User {
  name: string;
  email: string;
}

// Définition de l'interface pour le contexte
interface UserContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

// Création du contexte avec une valeur par défaut undefined
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Fournisseur de contexte
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fonction pour se connecter (login)
  const login = (name: string, email: string) => {
    setUser({ name, email });
  };

  // Fonction pour se déconnecter (logout)
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
