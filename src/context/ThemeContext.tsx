'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeColors {
  primary: string;
  secondary: string;
  cream: string;
  espresso: string;
  blush: string;
  borderRadius: string;
  fontHeading: string;
  fontBody: string;
  isDarkMode: boolean;
}

const defaultTheme: ThemeColors = {
  primary: '#6A5446',
  secondary: '#B8924A',
  cream: '#F5EEE2',
  espresso: '#2B211C',
  blush: '#E8D5C8',
  borderRadius: '0.75rem',
  fontHeading: 'Playfair Display',
  fontBody: 'Inter',
  isDarkMode: false,
};

interface ThemeContextType {
  theme: ThemeColors;
  updateTheme: (newTheme: Partial<ThemeColors>) => void;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);

  // Apply CSS variables to :root
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-cream', theme.cream);
    root.style.setProperty('--color-espresso', theme.espresso);
    root.style.setProperty('--color-blush', theme.blush);
    root.style.setProperty('--radius', theme.borderRadius);

    if (theme.isDarkMode) {
      root.classList.add('dark');
      root.style.setProperty('--color-bg', theme.espresso);
      root.style.setProperty('--color-fg', theme.cream);
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--color-bg', '#FDFCFA');
      root.style.setProperty('--color-fg', '#2B211C');
    }
  }, [theme]);

  const updateTheme = (newSettings: Partial<ThemeColors>) => {
    setTheme((prev) => ({ ...prev, ...newSettings }));
  };

  const toggleDarkMode = () => {
    setTheme((prev) => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}

