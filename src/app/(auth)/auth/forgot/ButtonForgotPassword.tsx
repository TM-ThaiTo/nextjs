'use client'
import { ModalChangePassword } from "@/components/auth/forgot.password-form";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function ButtonForgotPassword() {
    const [isModalChangePasswordOpen, setModalChangePasswordOpen] = useState<boolean>(false);
    return (
        <>
            <Typography align="center" sx={{ fontSize: 16, cursor: 'pointer', color: '#1877F2' }} onClick={() => setModalChangePasswordOpen(true)} >
                Forgot password?
            </Typography>
            <ModalChangePassword isModalChangePasswordOpen={isModalChangePasswordOpen} setModalChangePasswordOpen={setModalChangePasswordOpen} />
        </>
    )
}

