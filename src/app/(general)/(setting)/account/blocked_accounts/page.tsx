import { findDataBlock } from "@/actions/block/actions";
import { notFound } from "next/navigation";
import BlockedAccountForm from "./BlockedAccountForm";

export async function generateMetadata() {
    return {
        title: 'BlockAccount | Alex Trinh Social',
        description: 'BlockAccount | Alex Trinh Social',
        openGraph: { title: 'BlockAccount | Alex Trinh Social', description: 'BlockAccount | Alex Trinh Social', url: `/account/blocked_accounts`, type: 'article' }
    };
}

export default async function BlockedAccountsPage() {
    const { data, error } = await findDataBlock();
    if (error) {
        if (error.statusCode === 401) notFound();
    }

    return <BlockedAccountForm data={data?.data} query={data?._query} />
}