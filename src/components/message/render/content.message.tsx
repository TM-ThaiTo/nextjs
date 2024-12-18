'use client'

import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { messageContent } from '@/components/message/styles/index';

import { Messages } from "@/types/message";
import { handleRenderActionMessage } from '@/components/message/handle/render_messages';
import RenderItemMessage from '@/components/message/render/item.message';
import { decryptData } from '../../../helper/decryptData';

type Props = {
    room: any;
    messages: Messages;
    myUser: any;
}

export default function RenderContentMessage({ messages, myUser, room }: Props) {
    const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
    return (
        <>
            {messages.length > 0 && (
                messages
                    .slice().reverse()
                    .map((messageItem) => {
                        const isMyMessage = messageItem?.userSender?._id === myUser?._id;
                        const messageId = messageItem?.message?._id;
                        const time = messageItem?.message?.createdAt;
                        const { type, content: contentMessage } = messageItem?.message;
                        const content = type === 0 ? decryptData(contentMessage, room?.key) : contentMessage;

                        return (
                            <Box
                                key={messageId}
                                sx={{
                                    ...messageContent,
                                    justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
                                }}
                                onMouseEnter={() => setHoveredMessageId(messageId)}
                                onMouseLeave={() => setHoveredMessageId(null)}
                            >
                                {isMyMessage && hoveredMessageId === messageId && handleRenderActionMessage(true, time, isMyMessage, messageId, content)}
                                <RenderItemMessage isMyMessage={isMyMessage} time={time} iMessage={messageItem} room={room} />
                                {!isMyMessage && hoveredMessageId === messageId && handleRenderActionMessage(true, time, isMyMessage, messageId, content)}
                            </Box>
                        );
                    })
            )}
        </>
    );
}