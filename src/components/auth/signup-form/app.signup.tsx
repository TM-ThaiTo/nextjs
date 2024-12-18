'use client'

import React, { useState } from "react";
import { Box, Button, Container, Paper, TextField, Typography, useMediaQuery, } from "@mui/material";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import Link from "next/link";
import { RegisterDataType } from '@/types/auth'
import { registerAction } from '@/actions/auth/actions';
import { ValidateRegister, defaultValue } from "./validation";
import { CustomAlert } from "@/helper/custom_alert";

export const SignUp = () => {
    const router = useRouter();
    const [alert, setAlert] = useState<any>({ open: false, type: 'info', message: '' });

    const isMobile = useMediaQuery("(max-width:1000px)");
    const registerSchema = ValidateRegister;
    const initialValuesRegister: RegisterDataType = defaultValue;

    const handleFormSubmit = async (values: RegisterDataType,) => {
        const { data, error } = await registerAction(values);
        if (error) setAlert({ open: true, type: 'error', message: error?.message });
        if (data) {
            setAlert({ open: true, type: 'error', message: error?.message });
            router.push(`/verify/${data?.data}`)
        }
    };

    return (
        <>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesRegister}
                validationSchema={registerSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
                            <div style={{ width: 500 }}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    padding='10px'
                                    sx={{
                                        "& > div": { gridColumn: isMobile ? undefined : "span 4" },
                                    }}
                                >
                                    <>
                                        <TextField
                                            label="Email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={(values as RegisterDataType).email}
                                            name="email"
                                            error={Boolean(touched.email && errors.email)}
                                            helperText={touched.email && errors.email}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            label="Full name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={(values as RegisterDataType).fullName}
                                            name="fullName"
                                            error={Boolean(touched.fullName && errors.fullName)}
                                            helperText={touched.fullName && errors.fullName}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            label="User Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={(values as RegisterDataType).userName}
                                            name="userName"
                                            error={Boolean(touched.userName && errors.userName)}
                                            helperText={touched.userName && errors.userName}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            label="Password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={(values as RegisterDataType).password}
                                            name="password"
                                            type="password"
                                            error={Boolean(touched.password && errors.password)}
                                            helperText={touched.password && errors.password}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            label="Phone"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={(values as RegisterDataType).phone}
                                            name="phone"
                                            error={Boolean(touched.phone && errors.phone)}
                                            helperText={touched.phone && errors.phone}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            label="Address"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={(values as RegisterDataType).address}
                                            name="address"
                                            error={Boolean(touched.address && errors.address)}
                                            helperText={touched.address && errors.address}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                    </>
                                </Box>
                                <Box sx={{ width: '100%', maxWidth: 390, pr: '10px' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    >
                                        Register
                                    </Button>
                                </Box>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
            <CustomAlert alert={alert} setAlert={setAlert} />
        </>
    )
}