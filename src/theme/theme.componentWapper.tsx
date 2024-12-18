'use client';

import { ThemeProvider } from '@mui/material';
import React, { useContext, ReactNode } from 'react';
import { ThemeContext } from './theme.context';

interface ComponentWrapperProps { children: ReactNode; }

export default function ComponentWrapper({ children }: ComponentWrapperProps) {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) { throw new Error('ThemeContext must be used within a ThemeContextProvider'); }
    const { theme } = themeContext;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
