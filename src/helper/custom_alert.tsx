import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
type AlertType = 'error' | 'warning' | 'info' | 'success';

interface AlertState {
    open: boolean;
    type: AlertType;
    message: string;
    action?: React.ReactNode;
}

interface NotificationProps {
    alert: AlertState;
    setAlert: React.Dispatch<React.SetStateAction<AlertState>>;
}

export const CustomAlert: React.FC<NotificationProps> = ({ alert, setAlert }) => {
    const handleCloseNotify = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={handleCloseNotify}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleCloseNotify} severity={alert.type} sx={{ width: '100%' }}>
                {alert.message}
            </Alert>
        </Snackbar>
    );
};

