'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Rooms, Room } from "@/types/message";
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from '@/utils/hooks/router/useRouter';
import { useSocket } from "@/utils/socket/socket.context";
import { decryptData } from '../../../helper/decryptData';
import { Theme } from '@mui/material/styles';
import useThemeColors from "@/utils/hooks/theme/hookTheme";
type RoomMessagesProps = {
    myUser?: any;
    chatrooms: Rooms;
}

export default function RenderRoomMessages({ chatrooms, myUser }: RoomMessagesProps) {
    const { socket } = useSocket();
    const router = useRouter();
    const [updatedChatrooms, setUpdatedChatrooms] = useState<Rooms>(chatrooms);
    const { borderColor, textColorPrimary, textColorSecondary, linkColor } = useThemeColors();
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const renderDot = (isAbsolute: boolean) => <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: linkColor, ...(isAbsolute ? { position: 'absolute', right: 0, top: 0 } : { marginLeft: '20px' }) }} />
    const renderFullName = (userRecipient: any) => (
        <Typography component="span" sx={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: textColorPrimary }}>
            {userRecipient?.fullName}
        </Typography>
    );

    const renderLastMessage = useCallback((lastMessageAt: any, room: any) => {
        if (!lastMessageAt) return null;
        const messageContent = () => {
            switch (lastMessageAt?.type) {
                case -1: return 'Tin nhắn đã xoá';
                case 0: return decryptData(lastMessageAt?.content, room?.key).toString();
                case 1: return '📸 Hình ảnh';
                case 2: return '📄 File';
                case 3: return '🎥 Video';
                default: return 'Unknown message type';
            }
        };

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 300 }}>
                <Typography component="span" variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexGrow: 1, color: textColorPrimary }}>
                    {messageContent()}
                </Typography>
                <Typography component="span" variant="caption" sx={{ ml: 1, flexShrink: 0, color: textColorSecondary }}>
                    {lastMessageAt?.createdAt && new Date(lastMessageAt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            </Box>
        );
    }, [textColorPrimary, textColorSecondary]);

    const handleChangeRoom = (slug: string) => router.push(`/message/${slug}`);

    const handleUpdateLastMessage = useCallback((data: any) => {
        const { message } = data;
        setUpdatedChatrooms((prevChatrooms) => {
            const newChatrooms = prevChatrooms.map((room) => {
                if (room.conversation._id === message?.idConversation) {
                    return {
                        ...room,
                        conversation: {
                            ...room.conversation,
                            lastMessageAt: message
                        }
                    }
                }
                return room;
            });

            return newChatrooms;
        });
    }, []);

    const handleJoinRoom = useCallback((data: any) => {
        setUpdatedChatrooms((prevChatrooms) => {
            const newChatrooms = prevChatrooms.map((room) => {
                if (room.conversation._id === data) {
                    return {
                        ...room,
                        conversation: {
                            ...room.conversation,
                            lastMessageAt: {
                                ...room.conversation.lastMessageAt,
                                isRead: true
                            }
                        }
                    }
                }
                return room;
            });
            return newChatrooms;
        });
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('lastMessageCreate', handleUpdateLastMessage);
            socket.on('userJoin', handleJoinRoom);
            socket.on('lastMessageUnsend', handleUpdateLastMessage);

            return () => {
                socket.off('lastMessageCreate', handleUpdateLastMessage);
                socket.off('userJoin', handleJoinRoom);
            }
        }
    }, [socket, handleUpdateLastMessage, handleJoinRoom]);

    useEffect(() => { if (chatrooms != updatedChatrooms) setUpdatedChatrooms(chatrooms); }, [chatrooms, updatedChatrooms])
    if (updatedChatrooms.length === 0 || !updatedChatrooms) return <Typography component="div" variant="body1" sx={{ p: 2 }}>No messages</Typography>;
    return (
        <>
            {updatedChatrooms?.length !== 0 && (
                <List>
                    {updatedChatrooms.map(({ conversation, otherUser }: Room) => {
                        const { _id, lastMessageAt, slug } = conversation;
                        const { avatar, fullName } = otherUser;
                        const { isRead } = lastMessageAt;
                        const idSender = lastMessageAt?.sender;
                        const idMyUser = myUser?.id;
                        return (
                            <ListItem key={_id} button sx={{ position: 'relative' }} onClick={() => handleChangeRoom(slug)} >
                                <ListItemAvatar sx={{ position: 'relative' }}>
                                    <Avatar src={avatar || '/static/avt_default.png'} alt={fullName} sx={{ border: `1px solid ${borderColor}` }} />
                                    {isSmallScreen && !isRead && idMyUser !== idSender && <Typography component="span">{renderDot(true)}</Typography>}
                                </ListItemAvatar>
                                {!isSmallScreen && (
                                    <ListItemText
                                        primary={<Typography component="span" sx={{ color: textColorPrimary }}>{renderFullName(otherUser)}</Typography>}
                                        secondary={<Typography component="span" sx={{ color: textColorSecondary }}>{renderLastMessage(lastMessageAt, conversation)}</Typography>}
                                    />
                                )}
                                {!isSmallScreen && !isRead && idMyUser !== idSender && <Typography component="span">{renderDot(true)}</Typography>}
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </>
    );
}