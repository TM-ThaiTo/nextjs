'use client'

import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { LoginDataType } from "@/types/auth";
import { signIn } from "next-auth/react";
import { usePathname } from 'next/navigation';
import { useForm } from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useSnackbar from "@/utils/hooks/snackbar/useSnackbar";
import { ModalReactive } from '@/components/auth/verify-form';

export const LoginForm = () => {
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const pathname = usePathname();
    const [userEmail, setUserEmail] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginDataType>({
        defaultValues: { email: '', password: '' },
    });

    const handleOpenShowPassword = () => setShowPassword(!showPassword);
    const handleCloseShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    const handleFormSubmit = async (values: LoginDataType) => {
        const { email, password } = values;
        const result = await signIn("credentials", { redirect: false, username: email, password: password });
        const error = result?.error;

        if (error && error.startsWith('code:')) {
            const [codePart, messagePart] = error.split('|');
            const code = +codePart.split(':')[1];
            if (code === 1) {
                setSnackbarMessage({ type: 'error', message: 'Account already exists' });
                setOpenSnackbar(true);
            } else if (code === 2) {
                setSnackbarMessage({ type: 'error', message: 'Account chưa kích hoạt' });
                setOpenSnackbar(true);
            } else if (code === 3) {
                setSnackbarMessage({ type: 'error', message: 'Sai mật khẩu' });
                setOpenSnackbar(true);
            }
        }

        if (result?.ok && !error) {
            if (pathname !== '/auth/login') window.location.href = pathname;
            else window.location.href = '/';
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Box display="grid" gap="20px" gridTemplateColumns="1fr" >
                    <TextField
                        fullWidth
                        label="Email"
                        {...register('email', {
                            required: "Required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        {...register('password', { required: "Required" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleOpenShowPassword} onMouseDown={handleCloseShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff sx={{ color: '#8e8e8e' }} /> : <Visibility sx={{ color: '#8e8e8e' }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
            </form>
            <ModalReactive isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} userEmail={userEmail} />
        </>
    );
};
