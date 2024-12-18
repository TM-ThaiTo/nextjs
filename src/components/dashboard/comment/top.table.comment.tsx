'use client';

import { useRouter } from '@/utils/hooks/router/useRouter';
import { useState } from 'react';
import { AiFillBackward } from "react-icons/ai";
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ModalCreateComment from './modal.create.comment';
import Button from '@mui/material/Button';
import { AiFillPlusCircle, AiOutlineReload } from "react-icons/ai";

type Props = {
    id: string;
}

export default function TopTableComment({ id }: Props) {
    const router = useRouter();
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const handleClickOpenModalCreate = () => setOpenModalCreate(true);
    const handleCloseModalCreate = () => setOpenModalCreate(false);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={() => router.push('/dashboard/post')} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'black' }}>
                    <AiFillBackward />
                    <Typography>Back</Typography>
                </IconButton>
                <Typography variant="h6" component="h1" sx={{ fontWeight: 700 }}>Comment Table with Post id = {id}</Typography>
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

            {id && openModalCreate && <ModalCreateComment id={id} open={openModalCreate} onClose={handleCloseModalCreate} />}
        </>
    )
}