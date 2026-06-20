import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('cafecito_theme');
    // Default to LIGHT if no preference saved
    if (saved) return saved === 'dark';
    return false; // light by default
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cafecito_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cafecito_theme', 'light');
    }
  }, [dark]);

  const toggleTheme = () => setDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
