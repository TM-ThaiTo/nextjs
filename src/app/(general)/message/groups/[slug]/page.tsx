import { getGroupBySlug } from "@/actions/chat/group/conversation/actions";
import { getMessageGroup } from "@/actions/chat/group/message/actions";
import ContentGroupMessage from "@/components/message/group/content.group/content";
import { notFound } from "next/navigation";

export default async function RoomGroupMessagesPage({ params }: any) {
    const { slug } = params;
    if (!slug) notFound();
    const { data, error } = await getGroupBySlug(slug);
    const { auth, user, conversation } = data?.data;
    let messages: any;
    if (data) {
        const page = 1;
        const limit = 20;
        const { data, error } = await getMessageGroup(conversation.idConversation, page, limit);
        if (error) messages = [];
        if (data) messages = data;
    }
    return (
        <ContentGroupMessage
            room={conversation}
            myUser={user?.myUser}
            fMessages={messages}
        />
    );
}
