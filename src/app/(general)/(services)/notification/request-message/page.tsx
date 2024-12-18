import { getConversationPadding } from "@/actions/chat/p2p/conversation/actions";
import RenderRoomMessages from "@/components/message/render/room.message";
import FormNotificationRequestMessage from "./FormRequestMessage";

export async function generateMetadata() {
    return {
        title: 'Request Message | Alex Trinh Social',
        description: 'Request Message | Alex Trinh Social',
        openGraph: {
            title: 'Request Message | Alex Trinh Social',
            description: 'Request Message | Alex Trinh Social',
            url: `/notification/request-message`,
            type: 'article'
        }
    };
}

export default async function RequestMessageNotification() {
    const { data } = await getConversationPadding();
    const rooms = data || [];
    return (
        <>
            {rooms.length > 0
                ? <RenderRoomMessages chatrooms={rooms} myUser={null} />
                : <FormNotificationRequestMessage />
            }
        </>
    )
}