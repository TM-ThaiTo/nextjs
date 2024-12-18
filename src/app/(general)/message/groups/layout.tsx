import { getGroup } from '@/actions/chat/group/conversation/actions';
import { getConversationPadding } from '@/actions/chat/p2p/conversation/actions';
import LayoutGroupMessage from '@/components/message/group/layout.group';


type Props = {
    children: React.ReactNode;
}

export default async function LayoutGroupMessagePage({ children }: Props) {
    const { data } = await getGroup();
    const rooms = data?.data || [];
    return (
        <LayoutGroupMessage rooms={rooms}>
            <>{children}</>
        </LayoutGroupMessage>
    )
}
