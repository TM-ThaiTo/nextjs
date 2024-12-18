import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';

import { findUser } from '@/actions/customer/actions';
import { createConversation } from '@/actions/chat/p2p/conversation/actions';
import ModalNewGroup from './modal.new.group';
import { useRouter } from '@/utils/hooks/router/useRouter';
import useThemeColors from "@/utils/hooks/theme/hookTheme";
import { getLanguage } from '@/helper/mapTypesLanguage';
import { locales } from '@/language/constant';

type Props = {
    open: boolean;
    onClose: () => void;
};

function NewMessageModal({ open, onClose }: Props) {
    const { borderColor, textColorPrimary, boxColor, actionHoverColor, actionActiveColor, linkColor } = useThemeColors();
    const lang = getLanguage();
    const router = useRouter();
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingChat, setLoadingChat] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [isCreateGroup, setIsCreateGroup] = useState<boolean>(false);
    const handleOpenCreateGroup = () => setIsCreateGroup(true)
    const handleCloseCreateGroup = () => setIsCreateGroup(false)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (timeoutId) clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => {
            if (value.trim().length > 0) { searchUsers(value); }
            else setUsers([]);
        }, 500);
        setTimeoutId(newTimeoutId);
    };
    const searchUsers = async (query: string) => {
        setLoading(true);
        try {
            const { data, error } = await findUser(query);
            if (data) setUsers(data?.data);
            if (error) setUsers([]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const handleSelectUser = (user: any) => setSelectedUser(user);
    useEffect(() => { return () => { if (timeoutId) clearTimeout(timeoutId) } }, [timeoutId]);
    const handleClose = () => {
        setSearch('');
        setUsers([]);
        setSelectedUser(null);
        setLoading(false);
        setLoadingChat(false);
        onClose();
    }
    const handleChat = async () => {
        try {
            setLoadingChat(true);
            const dataC = { idUser: selectedUser.id, }
            const { data, error } = await createConversation(dataC);
            if (data) { handleClose(); router.push(`/message/${data?.data?.slug}`); }
            if (error) { console.error(error); setLoadingChat(false); }
        } catch (err) { console.error(err); setLoadingChat(false); }
    }
    return (
        <Modal open={open} onClose={onClose}>
            {isCreateGroup
                ? <ModalNewGroup onClose={handleCloseCreateGroup} />
                : <Box sx={{ width: 500, height: '100vh', maxHeight: 600, minHeight: 300, bgcolor: boxColor, color: textColorPrimary, borderRadius: 2, overflow: 'hidden', mx: 'auto', my: '10vh', boxShadow: 24, }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" px={2} py={1} bgcolor={boxColor} >
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <IconButton onClick={onClose} sx={{ color: textColorPrimary }}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" fontWeight="bold" sx={{ pl: 2 }}>{locales[lang]?.message?.createMessage?.NewMessage}</Typography>
                        </Box>
                        <Button variant="contained" sx={{ width: 100, borderRadius: '40px', color: textColorPrimary }} disabled={!selectedUser} onClick={handleChat} >
                            {loadingChat ? <CircularProgress size={24} sx={{ color: textColorPrimary }} /> : <>{locales[lang]?.message?.createMessage?.Chat}</>}
                        </Button>
                    </Box>
                    <Box display="flex" alignItems="center" px={2} py={1}>
                        <Typography variant="body1" fontWeight="bold" mr={1} display='flex' alignItems='center' pr='10px'><SearchIcon /> </Typography>
                        <InputBase placeholder={locales[lang]?.message?.createMessage?.Search} fullWidth sx={{ color: textColorPrimary, bgcolor: boxColor, px: 1, borderRadius: 1 }} value={search} onChange={handleSearchChange} />
                    </Box>
                    <Divider sx={{ bgcolor: borderColor }} />
                    <Button
                        onClick={handleOpenCreateGroup}
                        sx={{
                            width: '100%',
                            height: 70,
                            pl: '16px',
                            pr: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            backgroundColor: 'transparent',
                            color: 'gray',
                            '&:hover': {
                                backgroundColor: actionHoverColor,
                                color: textColorPrimary,
                            },
                            '&:active': {
                                backgroundColor: actionActiveColor,
                                color: textColorPrimary,
                            }
                        }}>
                        <Avatar sx={{ width: 40, height: 40, borderRadius: '50%', color: textColorPrimary }}><GroupsIcon /></Avatar>
                        <Typography sx={{ color: textColorPrimary, pl: 2 }}>{locales[lang]?.message?.createMessage?.CreateAGroup}</Typography>
                    </Button>
                    <Divider sx={{ bgcolor: boxColor }} />
                    <Box sx={{ height: '100%', maxHeight: 400, overflowY: 'auto' }}>
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <CircularProgress size={24} sx={{ color: textColorPrimary }} />
                            </Box>
                        ) : users.length > 0 ? (
                            users.map(user => (
                                <Box key={user.id} display="flex" alignItems="center" bgcolor={boxColor} borderRadius={1}
                                    sx={{
                                        height: 70,
                                        p: 2,
                                        cursor: 'pointer', '&:hover': { bgcolor: actionHoverColor },
                                        border: selectedUser?.id === user.id ? `1px solid ${linkColor}` : '1px solid transparent'
                                    }}
                                    onClick={() => handleSelectUser(user)}
                                >
                                    <Avatar src={user.avatar || undefined} alt={user.fullName} sx={{ width: 40, height: 40, mr: 2, border: `1px solid ${borderColor}` }} />
                                    <Box>
                                        <Typography variant="body1" fontWeight="bold" sx={{ color: textColorPrimary }}>{user.fullName}</Typography>
                                        <Typography variant="body2" sx={{ color: textColorPrimary }}>@{user.userName}</Typography>
                                    </Box>
                                </Box>
                            ))
                        ) : <></>}
                    </Box>
                </Box>
            }
        </Modal >
    );
}

export default NewMessageModal;
