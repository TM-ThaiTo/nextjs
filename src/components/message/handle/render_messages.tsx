'use client'

import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Messages } from "@/types/message";
import ActionItemMessage from "@/components/message/handle/action_item_message";

const handleGroupMessagesByDate = (messages: Messages) => {
    const groups: Array<{ date: string; messages: Messages }> = [];

    messages.forEach((item) => {
        // Lấy ngày, tháng, năm từ createdAt để nhóm tin nhắn
        const dateObj = new Date(item?.message?.createdAt);
        const date = dateObj.toLocaleDateString(); // Chuyển về chuỗi ngày (VD: "9/21/2024")

        // Tìm nhóm có cùng ngày
        const existingGroup = groups.find(group => group.date === date);

        if (existingGroup) {
            // Thêm tin nhắn vào cuối của nhóm tin nhắn đã tồn tại (tin nhắn cũ hơn nên nằm ở cuối)
            existingGroup.messages.push(item);
        } else {
            // Tạo nhóm mới với ngày mới
            groups.push({
                date: date,
                messages: [item],  // Tin nhắn đầu tiên vào mảng mới
            });
        }
    });

    // Sắp xếp các nhóm theo ngày (ngày mới nhất ở đầu)
    groups.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return groups;
};

const handleRenderContentTextMessage = (isMyMessage: boolean, content: string) => (
    <ListItemText
        primary={
            <Typography component="span" variant="body2" sx={{ wordWrap: 'break-word', color: isMyMessage ? 'text.primary' : 'text.secondary' }}>
                {content}
            </Typography>
        }
    />
);

const handleRenderActionMessage = (isRight: boolean, time: any, myMessage: boolean, messageId: string, content: string) => (
    <ActionItemMessage isRight={isRight} time={time} myMessage={myMessage} messageId={messageId} content={content} />
);

export {
    handleGroupMessagesByDate,
    handleRenderContentTextMessage,
    handleRenderActionMessage,
}