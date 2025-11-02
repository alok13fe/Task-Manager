import { useState, createContext, useEffect } from 'react';
import type { Dispatch, SetStateAction, ReactNode } from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark',
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>,
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider = ({children}: Readonly<{children: ReactNode}>) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if(theme === ""){
      localStorage.setItem("theme", "light");
    }
    else{
      if(theme === "light" || theme === "dark"){
        setTheme(theme);
      }
    }
  },[]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider};