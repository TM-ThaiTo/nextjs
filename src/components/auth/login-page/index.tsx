
'use client';

import { LoginForm } from "@/components/auth/login-form/app.login";
import ButtonLoginGoogle from "@/components/auth/login-form/button.login.google";
import ButtonLoginGithub from "@/components/auth/login-form/button.login.github";
import Link from "next/link";
import ButtonForgotPassword from "@/app/(auth)/auth/forgot/ButtonForgotPassword";
import { logoFull } from "@/helper/svg_icon";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

export default function LayoutLogin() {
    const isMobile = useMediaQuery("(max-width: 780px)");

    return (
        <div style={{ display: 'flex', justifyContent: 'center', maxHeight: 'calc(100vh - 100px)', height: '100%', alignItems: 'center', width: '100%' }}>
            {!isMobile && <div
                style={{
                    width: '370px',
                    height: '740px',
                    borderRadius: '60px',
                    backgroundColor: '#000',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        width: '200px',
                        height: '30px',
                        backgroundColor: '#000',
                        borderRadius: '0 0 20px 20px',
                        position: 'absolute',
                        top: '10px',
                        zIndex: 2,
                    }}
                />
                {/* Screen with the Image */}
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#fff',
                        borderRadius: '50px',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <Image src={'/static/background.png'} alt="Background"
                        width={370}
                        height={740}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>}
            <div style={{
                padding: '30px',
                borderRadius: '8px',
                width: '350px',
                height: 600,
                marginLeft: '10px',
                border: '0.5px solid #262626',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white'
            }}>
                <div style={{ width: '100%', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                    {logoFull('black')}
                </div>
                <LoginForm />

                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc' }} />
                    <span style={{ padding: '0 10px', color: '#888' }}>or</span>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc' }} />
                </div>
                <ButtonLoginGoogle />

                <div style={{ marginTop: '10px' }}>
                    <ButtonLoginGithub />
                </div>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <ButtonForgotPassword />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, textAlign: 'center', marginTop: '16px' }}>
                    <span>Don&apos;t have an account? </span>
                    <Link href="/auth/signup" style={{ fontSize: 16, fontWeight: 700, textDecoration: 'none', color: 'blue' }}>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}