'use client'
import React, { useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CustomAlert } from "@/helper/custom_alert";
import SendIcon from '@mui/icons-material/Send';
import { IChangePassword } from '@/types/auth'
import { RetryCodeForgot, ChangePassword } from "@/actions/auth/services";

const steps = ['Email', 'Change password', 'Done'];

export const ModalChangePassword = (props: any) => {
    const { isModalChangePasswordOpen, setModalChangePasswordOpen } = props;
    const [activeStep, setActiveStep] = useState<number>(0);
    const [alert, setAlert] = useState<any>({ open: false, type: 'info', message: '' });

    const [email, setEmail] = useState<string>('');
    const [id, setId] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [verifyPassword, setVerifyPassword] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const handleEndModal = () => {
        setEmail('');
        setId('');
        setPassword('');
        setVerifyPassword('');
        setCode('');
        setActiveStep(0);
        setAlert({ open: false, type: 'info', message: '' });
        setModalChangePasswordOpen(false);
    }

    const handleCheckEmail_Step1 = async () => {
        try {
            if (email.trim() === '') {
                setAlert({ open: true, type: 'error', message: 'Email không được để trống!!' });
                return;
            }
            const { data, error } = await RetryCodeForgot(email);

            if (error) setAlert({ open: true, type: 'error', message: error?.message });
            if (data && data?.code === 0) {
                setAlert({ open: true, type: 'success', message: 'Code đã được gửi tới email của bạn' });
                setId(data?.data);
                setActiveStep(1);
            }
        } catch (error) { console.error(" ==>> handleCheckEmail_Step1 error: ", error); };
    }

    const handleChangePassword_Step2 = async () => {
        if (code.trim() === '') setAlert({ open: true, type: 'error', message: 'Thiếu mã code xác thực' });
        if (password.trim() === '') setAlert({ open: true, type: 'error', message: 'Thiếu mật khẩu' });
        if (verifyPassword.trim() === '') setAlert({ open: true, type: 'error', message: 'Thiếu xác thực mật khẩu' });
        if (password !== verifyPassword) setAlert({ open: true, type: 'error', message: 'Mật khẩu xác thực không chính xác' });

        const data_changepassword: IChangePassword = { email: email, password: password, code: code }
        try {
            const { data, error } = await ChangePassword(data_changepassword);
            if (error) setAlert({ open: true, type: 'error', message: error?.message });
            if (data) {
                setAlert({ open: true, type: 'success', message: 'Đã đổi mật khẩu' });
                setActiveStep(2);
            }
        } catch (error) { console.error("===> check error handleChangePassword_Step2: ", error) }
    }

    return (
        <>
            <Modal
                open={isModalChangePasswordOpen}
                onClose={handleEndModal}
                aria-labelledby="create-post-modal-title"
                aria-describedby="create-post-modal-description"
                disableScrollLock
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', borderRadius: 1, width: 700, boxShadow: 24, height: "auto" }}>
                    <Typography id="create-post-modal-title" variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                        Đổi mật khẩu
                    </Typography>

                    <div style={{ marginBottom: 20 }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                    optional?: React.ReactNode;
                                } = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </div>

                    <Divider sx={{ marginY: '10px' }} />

                    {activeStep === 0 && (
                        <>
                            <div>
                                Vui lòng nhập email của bạn
                            </div>
                            <div style={{ paddingTop: 20 }}>
                                <TextField
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        '& .Mui-disabled': {
                                            color: 'rgba(0, 0, 0, 0.6)',
                                        }
                                    }}
                                />
                            </div>
                            <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" onClick={handleCheckEmail_Step1} endIcon={<SendIcon />}>Next</Button>
                            </div>
                        </>
                    )}
                    {activeStep === 1 && (
                        <>
                            <div style={{ paddingTop: 20 }}>
                                <TextField
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    sx={{
                                        '& .Mui-disabled': {
                                            color: 'rgba(0, 0, 0, 0.6)',
                                        }
                                    }}
                                />
                            </div>
                            <div style={{ paddingTop: 20 }}>
                                <TextField
                                    label="Verify Password"
                                    value={verifyPassword}
                                    onChange={(e) => setVerifyPassword(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    sx={{
                                        '& .Mui-disabled': {
                                            color: 'rgba(0, 0, 0, 0.6)',
                                        }
                                    }}
                                />
                            </div>
                            <div style={{ paddingTop: 20 }}>
                                <TextField
                                    label="Code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        '& .Mui-disabled': {
                                            color: 'rgba(0, 0, 0, 0.6)',
                                        }
                                    }}
                                />
                            </div>
                            <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" onClick={handleChangePassword_Step2} endIcon={<SendIcon />}>Next</Button>
                            </div>
                        </>
                    )}
                    {activeStep === 2 && (
                        <>
                            <div style={{ margin: "20px 0", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <p>Đổi mật khẩu thành công! Vui lòng đăng nhập lại</p>
                            </div>
                            <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" onClick={handleEndModal}>Thoát</Button>
                            </div>
                        </>
                    )}
                </Box>
            </Modal>
            <CustomAlert alert={alert} setAlert={setAlert} />
        </>
    )
}