
import React, { useEffect, useState } from 'react'
// material
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { FaUserPlus } from "react-icons/fa";

//components
import AddMember from './modal.add.member';
import RenderMember from './render.member';
import { searchMember } from '@/actions/chat/group/conversation/actions';


type Props = {
    data: any;
    onClickBackMain: () => void;
}

export default function SeeAllMemberDetailGroupMessage({
    data,
    onClickBackMain
}: Props) {
    const { auth, conversation, user } = data;
    const { myUser, owner, members } = user;
    const [search, setSearch] = useState<string>('');
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [users, setUsers] = useState<any>(user);

    const [openAddMember, setOpenAddMember] = useState<boolean>(false);
    const handleOpenAddMember = () => setOpenAddMember(true);
    const handleCloseAddMember = () => setOpenAddMember(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (timeoutId) clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => {
            if (value.trim().length > 0) { searchUsers(value); }
            else setUsers(user);
        }, 500);
        setTimeoutId(newTimeoutId);
    };
    const searchUsers = async (query: string) => {
        const dataS = {
            key: query,
            slug: conversation.slug,
            page: 1,
            limit: 5
        }
        const { data, error } = await searchMember(query, conversation.slug, 1, 5);
        if (data) setUsers(data?.data);
        if (error) setUsers(user);
    }
    useEffect(() => { return () => { if (timeoutId) clearTimeout(timeoutId) } }, [timeoutId]);

    return (
        <>
            <Box sx={{ height: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray', padding: '0px 10px' }}>
                <IconButton
                    sx={{
                        fontWeight: 600, fontSize: 20, transition: 'background-color 0.3s ease',
                        '&:hover': { backgroundColor: '#e0e0e0' },
                        '&:active': { backgroundColor: '#cfcfcf' },
                    }}
                    onClick={onClickBackMain}
                >
                    <ArrowBackIosNewIcon sx={{ fontSize: 20, color: 'black' }} />
                </IconButton>

                <Typography sx={{ fontWeight: 600, fontSize: 20 }}>List Member Group</Typography>
                <div />
            </Box>

            <Box sx={{ bgcolor: '#e9e9e9', height: 60, borderBottom: '1px solid gray', display: 'flex', alignItems: 'center', px: 2, }} >
                <SearchIcon sx={{ color: '#666', fontSize: 24, mr: 1, }} />
                <InputBase
                    placeholder="Search..." fullWidth
                    sx={{
                        color: '#333', bgcolor: 'white', px: 2, py: 0.5, borderRadius: 2, boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
                        '&:focus-within': { border: '1px solid #1976d2', },
                    }}
                    value={search}
                    onChange={handleSearchChange}
                />
                <IconButton onClick={handleOpenAddMember}>
                    <FaUserPlus style={{ color: 'black', fontSize: 24 }} />
                </IconButton>
            </Box>

            <RenderMember
                conversation={conversation}
                user={users}
                auth={auth}
            />

            {openAddMember && <AddMember open={openAddMember} onClose={handleCloseAddMember} conversation={conversation} />}
        </>
    )
}