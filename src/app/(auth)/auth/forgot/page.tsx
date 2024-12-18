import ButtonForgotPassword from "@/app/(auth)/auth/forgot/ButtonForgotPassword";

export async function generateMetadata() {
    return {
        title: 'Forgot | Alex Trinh Social',
        description: 'Forgot | Alex Trinh Social',
        openGraph: { title: 'Forgot | Alex Trinh Social', description: 'Forgot | Alex Trinh Social', url: `/auth/forgot`, type: 'article' }
    };
}
export default function ForGotPasswordPage() {
    return <ButtonForgotPassword />
}