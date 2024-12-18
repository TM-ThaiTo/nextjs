'use client'

import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Divider, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Formik } from 'formik';
import { useRouter } from '@/utils/hooks/router/useRouter';
import { VerityAccount } from '@/actions/auth/services';
import { CustomAlert } from '@/helper/custom_alert';

export const VerifyForm = ({ id }: any) => {
    const router = useRouter();
    const [alert, setAlert] = useState<any>({ open: false, type: 'info', message: '' });

    const initialValuesRegister = { _id: id, code: '' }
    const handleFormSubmit = async (values: any) => {
        try {
            const { data, error } = await VerityAccount(values);
            if (error) setAlert({ open: true, type: 'error', message: error?.message });
            if (data && data?.code === 0) {
                setAlert({ open: true, type: 'success', message: 'Kích hoạt tài khoản thành công' });
                setTimeout(() => (
                    router.push('/auth/login')
                ), 2000)
            }
        } catch (error) { console.error("handleFormSubmit app.verify: ", error) }
    }

    return (
        <>
            <Container maxWidth="sm" sx={{ marginTop: '30px' }}>
                <Paper elevation={3} sx={{ padding: '15px', margin: '5px', borderRadius: '5px' }}>
                    <Typography variant="h6" component="legend" gutterBottom>
                        Kích hoạt tài khoản
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Mã code đã được gửi tới email đăng ký, vui lòng kiểm tra email.
                    </Typography>
                    <Divider sx={{ marginY: '10px' }} />

                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValuesRegister}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleSubmit,
                            handleChange,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit} autoComplete="off">
                                <TextField
                                    label="Code"
                                    name="code"
                                    fullWidth
                                    value={values.code}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    margin="normal"
                                    error={Boolean(touched.code && errors.code)}
                                    helperText={touched.code && errors.code}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    Submit
                                </Button>
                            </form>
                        )}

                    </Formik>

                    <Link href="/" underline="none" sx={{ display: 'block', marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ArrowBackIcon fontSize="small" /> Quay lại trang chủ
                        </div>
                    </Link>
                    <Divider sx={{ marginY: '10px' }} />
                    <Typography variant="body2" align="center">
                        Đã có tài khoản? <Link href="/auth/login">Đăng nhập</Link>
                    </Typography>
                </Paper>
            </Container>
            <CustomAlert alert={alert} setAlert={setAlert} />
        </>
    );
};