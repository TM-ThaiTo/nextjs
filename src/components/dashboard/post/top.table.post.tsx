'use client';

import { useRouter } from '@/utils/hooks/router/useRouter';
import { useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AiFillPlusCircle, AiOutlineReload } from "react-icons/ai";

export default function TopTablePost() {
    const router = useRouter();
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const handleClickOpenModalCreate = () => setOpenModalCreate(true);
    const handleCloseModalCreate = () => setOpenModalCreate(false);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box></Box>
                <Typography variant="h6" component="h1" sx={{ fontWeight: 700 }}>Post Table</Typography>
                <Box sx={{ display: 'flex' }}>
                    <IconButton onClick={() => router.refresh()} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'black', marginRight: '10px' }}>
                        <AiOutlineReload />
                    </IconButton>
                    <Button variant="contained" sx={{ display: 'flex', alignItems: 'center', gap: 1 }} onClick={handleClickOpenModalCreate} >
                        <AiFillPlusCircle />
                        <Typography>Create</Typography>
                    </Button>
                </Box>
            </Box>
        </>
    )
}