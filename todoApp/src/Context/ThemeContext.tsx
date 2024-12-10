import { createContext, ReactNode, useState } from 'react';

// Définition des types pour le thème
type Theme = 'light' | 'dark';

// Définition de l'interface pour le contexte
interface ThemeContextType {
  theme: Theme; // État actuel du thème
  toggleTheme: () => void; // Fonction pour basculer le thème
}

// Création du contexte avec une valeur par défaut undefined
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

// Interface pour les props du ThemeProvider
interface ThemeProviderProps {
  children: ReactNode; // Composants enfants qui auront accès au contexte
}

// Création du fournisseur de contexte
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // État pour gérer le thème actuel, initialisé en 'light'
  const [theme, setTheme] = useState<Theme>('light');

  // Fonction pour basculer entre 'light' et 'dark'
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // Fourniture des valeurs du contexte à tous les composants enfants
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
