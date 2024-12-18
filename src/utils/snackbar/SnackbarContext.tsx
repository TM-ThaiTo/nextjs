'use client';
import React, { createContext, useState } from 'react';
import { SnackbarMessageType } from '@/types/snackbar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackbarContextType {
    openSnackbar: boolean;
    setOpenSnackbar: (open: boolean) => void;
    snackbarMessage: { type: SnackbarMessageType; message: string };
    setSnackbarMessage: (message: { type: SnackbarMessageType; message: string }) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<{ type: SnackbarMessageType; message: string }>({
        type: 'success',
        message: '',
    });

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }
    return (
        <SnackbarContext.Provider value={{ openSnackbar, setOpenSnackbar, snackbarMessage, setSnackbarMessage }}>
            {children}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarMessage?.type}
                    variant="filled" sx={{ width: '100%' }} >
                    {snackbarMessage?.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};


