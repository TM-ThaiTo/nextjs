'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { getTheme } from './theme.setting';

interface ThemeContextType {
    mode: 'light' | 'dark';
    setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
    theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeContextProviderProps {
    user: any | null;
    children: ReactNode;
}

export default function ThemeContextProvider({ children, user }: ThemeContextProviderProps) {
    const themeUser = user?.theme === 1 ? 'dark' : user?.theme === 0 ? 'light' : 'light';
    const [mode, setMode] = useState<'light' | 'dark'>(themeUser);

    useEffect(() => {
        const storedMode = localStorage.getItem('mode') as 'light' | 'dark';
        if (storedMode) {
            setMode(storedMode);
        } else {
            const userTheme = user?.theme === 1 ? 'dark' : 'light';
            setMode(userTheme);
            localStorage.setItem('mode', userTheme);
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('mode', mode);
    }, [mode]);

    const theme = getTheme(mode);

    return (
        <ThemeContext.Provider value={{ mode, setMode, theme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
