'use client';

import { useState } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import SendIcon from '@mui/icons-material/Send';
import { retryAction } from '@/actions/auth/actions';
import { VerityAccount } from '@/actions/auth/services';

const steps = ['User', 'Code Verify', 'Done'];

export const ModalReactive = (props: any) => {
    const { isModalOpen, setIsModalOpen, userEmail } = props;
    const [activeStep, setActiveStep] = useState<number>(0);
    const [code, setCode] = useState<string>('');
    const [idUser, setIdUser] = useState<string>('');

    const handleResendCode_Step1 = async () => {
        try {
            setIdUser('');
            const { data, error } = await retryAction(userEmail);
            if (error)
                if (data) {
                    setIdUser(data?.data);
                    setActiveStep(1);
                }
        } catch (error) { console.error(error) }
    }

    const handleActiveAccount_Step2 = async () => {
        try {
            if (code.trim() === '') {
                return;
            }
            const dataVerify = { _id: idUser, code }
            const { data, error } = await VerityAccount(dataVerify);
            if (error)
                if (data && data?.code === 0) {
                    setActiveStep(2);
                }
        } catch (error) { console.error(error) }
    }

    const handleEndModal = () => {
        setIdUser('');
        setActiveStep(0);
        setCode('');
        setIsModalOpen(false);
    }

    return (
        <>
            <Modal
                open={isModalOpen}
                onClose={handleEndModal}
                aria-labelledby="create-post-modal-title"
                aria-describedby="create-post-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', borderRadius: 1, width: 700, boxShadow: 24, height: 300 }}>
                    <Typography id="create-post-modal-title" variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                        Kích hoạt tài khoản
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
                                Account bạn chưa kích hoạt
                            </div>
                            <div style={{ paddingTop: 20 }}>
                                <TextField
                                    value={userEmail}
                                    variant="outlined" fullWidth disabled
                                    InputProps={{ readOnly: true, }}
                                    sx={{
                                        '& .Mui-disabled': {
                                            color: 'rgba(0, 0, 0, 0.6)',
                                        }
                                    }}
                                />
                            </div>
                            <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" onClick={handleResendCode_Step1} endIcon={<SendIcon />}>Resend Code</Button>
                            </div>
                        </>
                    )}

                    {activeStep === 1 && (
                        <>
                            <div>
                                Vui lòng nhập mã code được gửi tới email.
                            </div>
                            <div style={{ paddingTop: 20 }}>
                                <TextField
                                    label="Code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(!code)}
                                    helperText={!code}
                                    sx={{
                                        '& .Mui-disabled': {
                                            color: 'rgba(0, 0, 0, 0.6)',
                                        }
                                    }}
                                />
                            </div>
                            <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={handleResendCode_Step1}>Resend Code</Button>
                                <Button variant="contained" onClick={handleActiveAccount_Step2} endIcon={<SendIcon />}>Active</Button>
                            </div>
                        </>
                    )}

                    {activeStep === 2 && (
                        <>
                            <div style={{ margin: "20px 0", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <p>Tải khoản của bạn đã được kích hoạt thành công. Vui lòng đăng nhập lại</p>
                            </div>
                            <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" onClick={handleEndModal}>Thoát</Button>
                            </div>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};
