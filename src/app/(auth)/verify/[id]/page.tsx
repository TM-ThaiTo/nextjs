import { VerifyForm } from "@/components/auth/verify-form/app.verify";
import { authOptions } from "@/session";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
    return {
        title: 'Verify | Alex Trinh Social',
        description: 'Verify | Alex Trinh Social',
        openGraph: { title: 'Verify | Alex Trinh Social', description: 'Verify | Alex Trinh Social', url: `/verify/${params?.id}`, type: 'article' }
    };
}

const VerifyPage = async ({ params }: { params: { id: string } }) => {

    const session = await getServerSession(authOptions);
    if (session) return notFound();
    const { id } = params;

    return <VerifyForm id={id} />
}

export default VerifyPage;