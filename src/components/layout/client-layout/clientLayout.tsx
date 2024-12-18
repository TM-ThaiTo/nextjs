'use client';
import '@/style/style_css/global.css'
import React, { useState, useEffect, useContext } from 'react';
import { Layout } from '@/components/layout/auth-layout/app.layoutpage';
import { ThemeContext } from '@/theme/theme.context';
import CircularProgress from '@mui/material/CircularProgress';

interface ClientLayoutProps {
    children: React.ReactNode;
    myUser: any;
}

export function ClientLayout({ children, myUser, }: ClientLayoutProps) {
    const [isLoading, setIsLoading] = useState(true); // Quản lý trạng thái loading
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error('ThemeContext must be used within a ThemeContextProvider');
    }
    const { mode } = themeContext;
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        localStorage.setItem('lang', myUser?.lang)

        return () => clearTimeout(timer);
    }, [myUser]);

    return (
        <div className={`main-container ${mode}`}>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }} >
                    <CircularProgress />
                </div>
            ) : (
                <Layout myUser={myUser} >
                    {children}
                </Layout>
            )}
        </div>
    );
}
