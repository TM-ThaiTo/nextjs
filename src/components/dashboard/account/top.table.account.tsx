'use client';

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { AiOutlineReload, AiOutlinePlus } from "react-icons/ai";
import ModalCreateAccount from './modal.create.account'

export default function TopTableAccount() {
    const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
    const handleOpenModalCreate = () => setIsOpenModalCreate(true);
    const handleCloseModalCreate = () => setIsOpenModalCreate(false);

    const handleReloadAccount = () => {

    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '10px', height: 75 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 1000, fontSize: '1.5rem' }}>
                    Account List
                </Typography>

                <Box>
                    <IconButton onClick={handleReloadAccount}>
                        <AiOutlineReload style={{ color: 'black' }} />
                    </IconButton>
                    <Button variant="contained" sx={{ width: 'auto', height: 35 }} onClick={handleOpenModalCreate}>
                        <AiOutlinePlus style={{ marginRight: '10px' }} />
                        Add New
                    </Button>
                </Box>
            </Box>
            {isOpenModalCreate && <ModalCreateAccount open={isOpenModalCreate} onClose={handleCloseModalCreate} />}
        </>
    )
}