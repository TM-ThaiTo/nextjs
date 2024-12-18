'use client'

import { useState } from "react";
import { Modal, Box } from "@mui/material";
import { LoginForm } from "../login-form/app.login";

type ModalLoginProps = {
    open: boolean;
    handleClose: any;
}

export default function ModalLogin({ open, handleClose }: ModalLoginProps) {
    const handleEndModal = () => {
        handleClose(false);
    }
    return (
        <Modal
            open={open}
            onClose={handleEndModal}
            aria-labelledby="create-post-modal-title"
            aria-describedby="create-post-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <LoginForm />
        </Modal>
    )
}
