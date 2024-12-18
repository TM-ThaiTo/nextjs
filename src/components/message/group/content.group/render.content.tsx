'use client'

import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { messageContent } from '@/components/message/styles/index';

import { Messages } from "@/types/message";
import { handleRenderActionMessage } from '@/components/message/handle/render_messages';
import { decryptData } from '@/helper/decryptData';
import RenderItemMessageGroup from './render.item';

type Props = {
    room: any;
    messages: Messages;
    myUser: any;
}

export default function RenderContentMessageGroup({ messages, myUser, room }: Props) {
    const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
    return (
        <>
            {messages.length > 0 && (
                messages
                    .slice().reverse()
                    .map((item: any) => {
                        const { message } = item;
                        const isMyMessage = message?.sender === myUser?._id;
                        const messageId = message?._id;
                        const time = message?.createdAt;
                        const type = message?.type;
                        const contentMessage = message?.content;
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
                                {isMyMessage &&
                                    <Box sx={{ width: 100 }}>
                                        {isMyMessage && hoveredMessageId === messageId && handleRenderActionMessage(true, time, isMyMessage, messageId, content)}
                                    </Box>
                                }
                                <RenderItemMessageGroup isMyMessage={isMyMessage} time={time} iMessage={item} room={room} />
                                {!isMyMessage &&
                                    <Box sx={{ width: 100 }}>
                                        {!isMyMessage && hoveredMessageId === messageId && handleRenderActionMessage(true, time, isMyMessage, messageId, content)}
                                    </Box>
                                }
                            </Box>
                        );
                    })
            )}
        </>
    );
}