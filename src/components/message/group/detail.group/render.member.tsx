'use client';

import { useState } from 'react';
// material
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FaFacebookMessenger } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";

// actions
import { createConversation } from '@/actions/chat/p2p/conversation/actions';
// hooks
import { useRouter } from '@/utils/hooks/router/useRouter';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';
// style
import { style_member } from '@/style/style_mui/message';
import { deleteMemberConversation } from '@/actions/chat/group/conversation/actions';

type Props = {
    conversation: any;
    user: any;
    auth: any;
    onClickSeeAll?: () => void;
}
export default function RenderMember({ conversation, user, auth, onClickSeeAll }: Props) {
    const router = useRouter();
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const { isAdmin } = auth;
    const { myUser, owner, members } = user;
    const { idConversation: roomId, slug, displayName, notification, totalMember } = conversation;
    const { _id, slug: slugOwner, fullName, avatar } = owner;

    const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
    const [loadingChat, setLoadingChat] = useState<boolean>(false);

    const handleClickProfile = (slug: string) => { if (slug) window.open(`/${slug}`, '_blank'); }

    const handleChat = async () => {
        setLoadingChat(true);
        const { data, error } = await createConversation({ idUser: hoveredIndex });
        if (data) { setLoadingChat(false); router.push(`/message/${data?.data?.slug}`); }
        if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); setLoadingChat(false); }
    }

    const handleDeleteUser = async () => {
        const { data, error } = await deleteMemberConversation({ member: hoveredIndex, slug });
        if (data) { setSnackbarMessage({ type: 'success', message: data?.message }); setOpenSnackbar(true); setLoadingChat(false); }
        if (error) { setSnackbarMessage({ type: 'error', message: error?.message }); setOpenSnackbar(true); setLoadingChat(false); }
    }
    return (
        <Box sx={{ flex: 1, borderBottom: '0.5px solid gray', overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1, pl: '24px', pr: '24px', pt: '14px' }}>
                <Typography sx={{ fontWeight: 600, fontSize: 15 }}>Listing members {`(${totalMember})`}</Typography>
                {onClickSeeAll && <Typography component='div' sx={{ fontWeight: 600, fontSize: 15, color: 'blue', cursor: 'pointer' }} onClick={onClickSeeAll}>See All</Typography>}
            </Box>
            <Box sx={style_member} onClick={() => handleClickProfile(slug)} onMouseEnter={() => setHoveredIndex(_id)} onMouseLeave={() => setHoveredIndex(null)} >
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                        <Avatar src={avatar || '/static/avt_default.png'} alt="avatar" sx={{ height: 50, width: 50, border: '0.5px solid gray' }} />
                        <Box sx={{ ml: 2 }}>
                            <Typography sx={{ fontWeight: 800 }}>{slugOwner} owner</Typography>
                            <Typography>{fullName}</Typography>
                        </Box>
                    </Box>
                    {hoveredIndex === _id && myUser?._id !== _id && (
                        <Tooltip title="Chat" placement="top">
                            <IconButton onClick={(e) => { e.stopPropagation(); handleChat(); }} sx={{ ml: 'auto' }} >
                                {loadingChat ? <CircularProgress size={24} sx={{ color: 'black' }} /> : <FaFacebookMessenger style={{ color: 'black' }} />}
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Box>
            {members.map((item: any, index: any) => {
                const { slug, _id, fullName, avatar } = item;
                return (
                    <Box sx={style_member} key={index} onClick={() => handleClickProfile(slug)} onMouseEnter={() => setHoveredIndex(_id)} onMouseLeave={() => setHoveredIndex(null)} >
                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                                <Avatar src={avatar || '/static/avt_default.png'} alt="avatar" sx={{ height: 50, width: 50, border: '0.5px solid gray' }} />
                                <Box sx={{ ml: 2 }}>
                                    <Typography sx={{ fontWeight: 800 }}>{slug}</Typography>
                                    <Typography>{fullName}</Typography>
                                </Box>
                            </Box>
                            {hoveredIndex === _id && myUser?._id !== _id && (
                                <Box sx={{ display: 'flex' }}>
                                    <Tooltip title="Chat" placement="top">
                                        <IconButton onClick={(e) => { e.stopPropagation(); handleChat(); }} sx={{ ml: 'auto' }} >
                                            {loadingChat ? <CircularProgress size={24} sx={{ color: 'black' }} /> : <FaFacebookMessenger style={{ color: 'black' }} />}
                                        </IconButton>
                                    </Tooltip>

                                    {isAdmin && <Tooltip title="Delete User" placement="top">
                                        <IconButton onClick={(e) => { e.stopPropagation(); handleDeleteUser(); }} sx={{ ml: 'auto' }} >
                                            {loadingChat ? <CircularProgress size={24} sx={{ color: 'black' }} /> : <FaUserTimes style={{ color: 'red' }} />}
                                        </IconButton>
                                    </Tooltip>}
                                </Box>
                            )}
                        </Box>
                    </Box>
                );
            })}
        </Box>
    )
}