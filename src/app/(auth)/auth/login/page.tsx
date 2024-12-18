'use server'

import { LoginForm } from "@/components/auth/login-form/app.login";
import ButtonLoginGoogle from "@/components/auth/login-form/button.login.google";
import ButtonLoginGithub from "@/components/auth/login-form/button.login.github";
import Link from "next/link";
import ButtonForgotPassword from "@/app/(auth)/auth/forgot/ButtonForgotPassword";
import { logoFull } from "@/helper/svg_icon";

export async function generateMetadata() {
    return {
        title: 'Login | Alex Trinh Social',
        description: 'Login | Alex Trinh Social',
        openGraph: { title: 'Login | Alex Trinh Social', description: 'Login | Alex Trinh Social', url: `/auth/login`, type: 'article' }
    };
}
export default async function SignIn() {
    return (
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
    );
}
