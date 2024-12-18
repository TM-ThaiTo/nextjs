import { action_dataMyUser } from "@/actions/user/actions";
import { redirect } from "next/navigation";
import PricacyForm from "./Pricacy";

export async function generateMetadata() {
    return {
        title: 'Privacy | Alex Trinh Social',
        description: 'Privacy | Alex Trinh Social',
        openGraph: { title: 'Privacy | Alex Trinh Social', description: 'Privacy | Alex Trinh Social', url: `/account/privacy`, type: 'article' }
    };
}
export default async function PrivacyPageAccount() {
    const { data, error } = await action_dataMyUser();
    if (error || !data) redirect('/auth/login');
    return <PricacyForm data={data?.data} />
}