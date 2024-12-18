import { getServerSession } from 'next-auth';
import { authOptions, GetInfoUser } from '@/session';
import { redirect } from "next/navigation";
import LayoutMessage from "@/components/message/layout"
import { getConversation } from '@/actions/chat/p2p/conversation/actions';

type Props = {
    children: React.ReactNode;
}

export default async function LayoutMessagePage({ children }: Props) {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/auth/login');
    const myUser = await GetInfoUser();
    const { data } = await getConversation();
    const rooms = data || [];

    return (
        <LayoutMessage rooms={rooms} myUser={myUser}>
            <>{children}</>
        </LayoutMessage>
    )
}
