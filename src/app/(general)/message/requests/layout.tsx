import { getConversationPadding } from '@/actions/chat/p2p/conversation/actions';
import LayoutRequestMessage from '@/components/message/requests/layout.requests';

type Props = {
    children: React.ReactNode;
}

export default async function LayoutRequestMessagePage({ children }: Props) {
    const { data } = await getConversationPadding();
    const rooms = data || [];
    return (
        <LayoutRequestMessage rooms={rooms}>
            <>{children}</>
        </LayoutRequestMessage>
    )
}
