import ButtonLoginGoogle from '@/components/auth/login-form/button.login.google';
import { SignUp } from '@/components/auth/signup-form/app.signup';
import { logoFull } from '@/helper/svg_icon';
import { authOptions } from '@/session';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
    return {
        title: 'SignUp | Alex Trinh Social',
        description: 'SignUp | Alex Trinh Social',
        openGraph: { title: 'SignUp | Alex Trinh Social', description: 'SignUp | Alex Trinh Social', url: `/auth/signup`, type: 'article' }
    };
}

export default async function SignUpPage() {
    const session = await getServerSession(authOptions);
    if (session) return notFound();
    return (
        <div style={{ display: 'flex', justifyContent: 'center', maxHeight: 'calc(100vh - 100px)', height: '100%', alignItems: 'center', width: '100%' }}>
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px', flexDirection: 'column', width: 500, }}>
                <Box sx={{ padding: '30px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#FFFFFF' }}>
                    <div style={{ width: '100%', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                        {logoFull('black')}
                    </div>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '15px', fontWeight: 700, mb: 2 }}>{`Sign up to see your friends' photos and videos.`}</Typography>
                    </Box>
                    <ButtonLoginGoogle />
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc' }} />
                        <span style={{ padding: '0 10px', color: '#888' }}>or</span>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc' }} />
                    </div>
                    <SignUp />
                </Box>

                <Box sx={{
                    mt: '10px', borderRadius: '8px', height: 60, width: '100%', border: '1px solid #ccc',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    backgroundColor: '#FFFFFF'
                }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 700 }}>Have an account?</Typography>
                    <Link href={'/auth/login'} style={{ fontSize: 15, fontWeight: 700, marginLeft: '10px', textDecoration: 'none', color: '#007bff' }}>Log in</Link>
                </Box>
            </Container>
        </div>
    )
}