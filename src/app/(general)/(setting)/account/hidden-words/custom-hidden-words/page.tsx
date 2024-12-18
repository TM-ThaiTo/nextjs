import { getOneHidden } from "@/actions/hidden-word/action";
import CustomHiddenWordsForm from "./CustomHiddenWordsForm";
import { redirect } from "next/navigation";

export async function generateMetadata() {
    return {
        title: 'Cusstom Cusstom Hidden Words | Alex Trinh Social',
        description: 'Cusstom Hidden Words | Alex Trinh Social',
        openGraph: { title: 'Cusstom Hidden Words | Alex Trinh Social', description: 'Cusstom Hidden Words | Alex Trinh Social', url: `/account/hidden-words/custom-hidden-words`, type: 'article' }
    };
}

export default async function CusstomHiddenWord() {
    const { data, error } = await getOneHidden();
    if (error) {
        if (error?.statusCode === 401) redirect('/auth/login');
    }
    let dataHidden = null;
    if (data) dataHidden = data?.data;
    return <CustomHiddenWordsForm data={dataHidden} />
}