import { getOneHidden } from "@/actions/hidden-word/action";
import HiddenWordsSettings from "./HiddenWordSettings";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata() {
    return {
        title: 'Hidden Words | Alex Trinh Social',
        description: 'Hidden Words | Alex Trinh Social',
        openGraph: { title: 'Hidden Words | Alex Trinh Social', description: 'Hidden Words | Alex Trinh Social', url: `/account/hidden-words`, type: 'article' }
    };
}

export default async function HiddenWordsPage() {
    const { data, error } = await getOneHidden();
    if (error) {
        if (error?.statusCode === 401) redirect('/auth/login');
        else notFound();
    }
    let dataHidden = null;
    if (data) dataHidden = data?.data;
    return <HiddenWordsSettings data={dataHidden} />
}