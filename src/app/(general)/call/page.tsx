import React from 'react';
import { authOptions } from "@/session";
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import CallPageForm from '@/components/calls/call_page';
import { getDetailCallConversation } from '@/actions/chat/p2p/conversation/actions';

export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const video: boolean = searchParams.has_video === 'true';
    const room: string | undefined = searchParams.roomId as string | undefined;
    const typeCall = video ? 'Video' : 'Audio';
    return {
        title: `Call ${typeCall}`,
        description: `Page Call ${typeCall} with ${room}`,
        openGraph: {
            title: `Call ${typeCall}`,
            description: `Page Call ${typeCall}`,
            url: `/call?has_video=${video}&roomId=${room}`,
            type: 'article',
        }
    }
}

export default async function CallPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/auth/login');
    const video: boolean = searchParams.has_video === 'true';
    const room: string | undefined = searchParams.roomId as string | undefined;
    if (!room || (video !== true && video !== false)) notFound();
    const { data, error } = await getDetailCallConversation(room);
    if (!data && error) notFound()
    return <CallPageForm video={video} room={room} data={data} />
}