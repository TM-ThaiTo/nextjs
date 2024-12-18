import React, { useState } from 'react';
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { useRouter } from '@/utils/hooks/router/useRouter';
import { useSocket } from "@/utils/socket/socket.context";
import { Theme } from '@mui/material/styles';
import { decryptData } from '../../../helper/decryptData';
import Stack from '@mui/material/Stack';

import { usePathname } from 'next/navigation';
import { style_avatar_myuser, style_avatar_owner, style_total_member, } from '@/style/style_mui/message'
import importThemeAndLanguge from '@/helper/importThemeAndLanguge';

type RoomMessagesProps = {
    myUser?: any;
    chatrooms: any;
}

export default function RenderRoomGroupMessages({ chatrooms, myUser }: RoomMessagesProps) {
    const { lang, locales, useThemeColors } = importThemeAndLanguge();
    const { borderColor, textColorPrimary, actionHoverColor, actionActiveColor, boxColor } = useThemeColors();
    const router = useRouter();
    const path = usePathname();
    const [updatedChatrooms, setUpdatedChatrooms] = useState<any>(chatrooms);
    const handleChangeRoom = (slug: string) => router.push(`/message/groups/${slug}`);

    const renderNameGroup = (name: any) => (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography component="span" fontWeight="bold" sx={{
                maxWidth: 250, overflow: 'hidden',
                textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: textColorPrimary
            }} >
                {name}
            </Typography>
        </Box>
    );
    const renderLastMessage = (message: any) => {
        return (
            <Typography component="span" color="textSecondary">
                last mesaage
            </Typography>
        )
    }
    if (updatedChatrooms.length === 0 || !updatedChatrooms) return <Typography component="div" variant="body1" sx={{ p: 2 }}>{locales[lang]?.message?.messageGroup.NoGroup}</Typography>;
    return (
        <>
            {updatedChatrooms?.length !== 0 && (
                <List>
                    {updatedChatrooms.map((item: any) => {
                        const { room, myUser, owner } = item;
                        const { _id, slug, displayName, type, totalMember } = room;
                        const { avatar } = myUser;
                        const { avatarOwner } = owner;
                        const isSelectedRoom = path.includes(slug);
                        return (
                            <ListItem
                                key={_id}
                                button
                                sx={{
                                    position: 'relative', display: 'flex', alignItems: 'center', height: 80, justifyContent: 'center',
                                    backgroundColor: isSelectedRoom ? actionActiveColor : 'transparent',
                                    '&:hover': !isSelectedRoom ? { backgroundColor: actionHoverColor } : {},
                                }}
                                onClick={() => handleChangeRoom(slug)}
                            >
                                <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Stack direction="row" spacing={-1} sx={{ position: 'relative', width: 60, height: 60 }} >
                                        <Avatar src={avatarOwner || '/static/avt_default.png'} alt="Owner Avatar" sx={{ ...style_avatar_owner, border: `2px solid ${borderColor}` }} />
                                        <Avatar src={avatar || '/static/avt_default.png'} alt="Member Avatar" sx={{ ...style_avatar_myuser, border: `2px solid ${borderColor}` }} />
                                        <Avatar sx={{
                                            width: 32, height: 32,
                                            backgroundColor: '#b8b8b8',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            position: 'absolute',
                                            top: 0,
                                            left: 32,
                                            zIndex: 1, border: `2px solid ${borderColor}`,
                                            color: textColorPrimary
                                        }} >
                                            {totalMember > 100 ? '99+' : `+${totalMember - 2}`}
                                        </Avatar>
                                    </Stack>
                                </ListItemAvatar>

                                <ListItemText
                                    primary={<Typography component="span">{renderNameGroup(displayName)}</Typography>}
                                    secondary={<Typography component="span">{renderLastMessage(displayName)}</Typography>}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </>
    );
}