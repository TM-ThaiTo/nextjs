import { tablePostFields, tableCommentFields, tableCoversationFields } from "@/constants/row_table";
import { formatTimeMessage } from "@/helper/formatTime";

export const filterPosts = (posts: any) => {
    return posts.map((item: any) => ({
        id: item._id,
        ...Object.fromEntries(
            Object.entries(item).filter(([key]) => tablePostFields.includes(key))
        ),
        type: item.type === 1 ? 'image' : item.type === 2 ? 'video' : item.type,
        status: item.status === 1 ? 'public' : item.status === 2 ? 'private' : item.status === 3 ? 'share' : item.status,
    }));
}

export const filterCommentForPosts = (comments: any) => {
    return comments.map((item: any) => ({
        id: item._id,
        ...Object.fromEntries(
            Object.entries(item).filter(([key]) => tableCommentFields.includes(key))
        ),
        createdAt: formatTimeMessage(item.createdAt),
        updatedAt: formatTimeMessage(item.updatedAt),
    }));
};

export const filterConversation = (conversations: any) => {
    return conversations.map((item: any) => ({
        id: item._id,
        ...Object.fromEntries(
            Object.entries(item).filter(([key]) => tableCoversationFields.includes(key))
        ),
        idLastMessage: item?.lastMessageAt?._id,
        updatedAt: formatTimeMessage(item.updatedAt),
        createdAt: formatTimeMessage(item.createdAt),
    }));
}