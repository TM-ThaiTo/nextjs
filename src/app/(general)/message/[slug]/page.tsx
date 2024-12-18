import React from 'react';
import { notFound } from 'next/navigation';
import ContentMessage from '@/components/message/content.message';
import { getRoomBySlugConversation } from '@/actions/chat/p2p/conversation/actions';
import { getMessageByConvesations } from '@/actions/chat/p2p/message/actions';

export async function generateMetadata({ params }: any) {
    return {
        title: 'Message Room',
        description: 'Message Room',
        openGraph: { title: 'Message Room', description: 'Message Room', url: `/message/${params.slug}`, type: 'article', }
    }
}

export default async function RoomMessagesPage({ params }: any) {
    const { slug } = params;
    const { data, error } = await getRoomBySlugConversation(slug);

    if (error) notFound();
    if (!data) notFound();
    const { user, receiver, conversation } = data;

    let messages: any;
    if (data && data.conversation) {
        const page = 1;
        const limit = 20;
        const { data, error } = await getMessageByConvesations(conversation?._id, page, limit);
        if (error) messages = [];
        if (data) messages = data;
    }

    return (
        <ContentMessage
            room={conversation}
            myUser={user}
            recipient={receiver}
            fMessages={messages}
        />
    )
}
