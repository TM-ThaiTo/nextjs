'use server'

import { getRoomBySlugConversation } from "@/actions/chat/p2p/conversation/actions";
import { checkBlock } from "@/actions/block/actions";
import { notFound } from "next/navigation";
import LayoutMessageBySlugRoomClient from "./LayoutMessageBySlugRoomClient";

export async function generateMetadata({ params }: any) {
    return {
        title: 'Message Group Room',
        description: 'Message Group Room',
        openGraph: { title: 'Message Group Room', description: 'Message Group Room', url: `/message/groups/${params.slug}`, type: 'article', }
    }
}

export default async function LayoutMessageBySlugRoom({ params, children }: { params: { slug: string }, children: React.ReactNode }) {
    const { data, error } = await getRoomBySlugConversation(params?.slug);

    if (error || !data) notFound();
    const { receiver } = data;
    const { data: dataBlocked } = await checkBlock(receiver?._id);
    const blocked = dataBlocked?.data?.blocked || false;
    return (
        <LayoutMessageBySlugRoomClient data={data} initialBlocked={blocked} >
            {children}
        </LayoutMessageBySlugRoomClient>
    );
}
