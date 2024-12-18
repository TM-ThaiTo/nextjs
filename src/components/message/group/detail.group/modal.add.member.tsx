import React, { useState, useEffect } from 'react';

// material
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
// actions
import { findUserAddMember } from '@/actions/chat/group/conversation/actions';
import { addMemberConversation } from '@/actions/chat/group/conversation/actions';
// hooks
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';

type Props = {
    conversation: any;
    open: boolean;
    onClose: () => void;
};

export default function AddMember({ conversation, open, onClose }: Props) {
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();

    const { slug, idConversation } = conversation;

    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingChat, setLoadingChat] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

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
            const { data, error } = await findUserAddMember(query, slug);
            if (data) setUsers(data?.data);
            if (error) setUsers([]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const handleSelectUser = (user: any) => {
        const isUserSelected = selectedUsers.some(item => item.id === user.id);
        if (isUserSelected) setSelectedUsers((prev) => prev.filter(item => item.id !== user.id));
        else setSelectedUsers((prev) => [...prev, user]);
        setUsers([]);
        setSearch('');
    }
    const handleRemoveUser = (id: string) => setSelectedUsers((prev) => prev.filter(user => user.id !== id));

    const handleCloseCreateGroup = () => {
        setLoading(false);
        setLoadingChat(false);
        setSearch('');
        setSelectedUsers([]);
        setSelectedUsers([]);
        onClose();
    }
    useEffect(() => { return () => { if (timeoutId) clearTimeout(timeoutId) } }, [timeoutId]);

    const handleAddMember = async () => {
        try {
            setLoadingChat(true);
            const dataC = { slug, members: selectedUsers.map(item => item?.id) }
            const { data, error } = await addMemberConversation(dataC);
            if (data) {
                setSnackbarMessage({ type: 'success', message: 'Add member success!' });
                setOpenSnackbar(true);
                setLoadingChat(false);
            }
            if (error) {
                setSnackbarMessage({ type: 'error', message: error?.message });
                setOpenSnackbar(true);
                setLoadingChat(false);
            }
        } catch (e) { console.error(e); }
    }
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 500,
                    height: '100vh',
                    maxHeight: 600,
                    minHeight: 300,
                    bgcolor: 'white',
                    color: 'black',
                    borderRadius: 2,
                    overflow: 'hidden',
                    mx: 'auto',
                    my: '10vh',
                    boxShadow: 24,
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between" px={2} py={1} bgcolor="#f5f5f5">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton onClick={handleCloseCreateGroup} sx={{ color: 'black' }}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" fontWeight="bold" sx={{ pl: 2 }}>
                            Add member
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: 100, borderRadius: '40px' }}
                        disabled={selectedUsers.length === 0}
                        onClick={handleAddMember}
                    >
                        {loadingChat ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Next'}
                    </Button>
                </Box>
                <Box display="flex" alignItems="center" px={2} py={1}>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        mr={1}
                        display="flex"
                        alignItems="center"
                        pr="10px"
                    >
                        <SearchIcon />
                    </Typography>
                    <InputBase
                        placeholder="Search..."
                        fullWidth
                        sx={{
                            color: 'black',
                            bgcolor: '#f5f5f5',
                            px: 1,
                            borderRadius: 1,
                        }}
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Box>
                {selectedUsers.length > 0 && (
                    <>
                        <Divider sx={{ bgcolor: '#e0e0e0' }} />
                        <Box display="flex" gap={1} flexWrap="wrap" mt={1} mb={1} ml={2} mr={2}>
                            {selectedUsers.map(user => (
                                <Box
                                    key={user.id}
                                    display="flex"
                                    alignItems="center"
                                    px={1.5}
                                    py={0.5}
                                    sx={{
                                        borderRadius: '20px',
                                        backgroundColor: '#f5f5f5',
                                        color: 'black',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    <Avatar src={user.avatar} alt={user.fullName} sx={{ width: 24, height: 24, mr: 1 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 1 }}>
                                        {user.fullName}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        sx={{ color: 'black', p: 0.5 }}
                                        onClick={() => handleRemoveUser(user.id)}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    </>
                )}
                <Divider sx={{ bgcolor: '#e0e0e0' }} />
                <Box sx={{ height: '100%', maxHeight: 400, overflowY: 'auto', mt: 1 }}>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <CircularProgress size={24} sx={{ color: 'gray' }} />
                        </Box>
                    ) : users.length > 0 ? (
                        users.map(user => (
                            <Box
                                key={user.id}
                                display="flex"
                                alignItems="center"
                                bgcolor="none"
                                p={1}
                                height={66}
                                onClick={() => handleSelectUser(user)}
                            >
                                <Avatar src={user.avatar || undefined} alt={user.fullName} sx={{ width: 40, height: 40, mr: 2 }} />
                                <Box>
                                    <Typography variant="body1" fontWeight="bold">
                                        {user.fullName}
                                    </Typography>
                                    <Typography variant="body2" color="gray">
                                        @{user.userName}
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
        </Modal>
    );
}