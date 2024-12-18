'use client';
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AiOutlinePlus, AiOutlineReload } from "react-icons/ai";
import ModalCreatePermission from "@/components/dashboard/permission/modal.create.permission";
import { reloadPermissionAction } from "@/actions/permission/actions";

type Props = {
    modules: string[];
}

export default function TopTablePermission({ modules }: Props) {

    const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
    const handleOpenModalCreate = () => setIsOpenModalCreate(true);
    const handleCloseModalCreate = () => setIsOpenModalCreate(false);

    const handleReloadPermission = () => {
        reloadPermissionAction();
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '10px', height: 75 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 1000, fontSize: '1.5rem' }}>
                    Permissions List
                </Typography>

                <Box>
                    <IconButton onClick={handleReloadPermission}>
                        <AiOutlineReload style={{ color: 'black' }} />
                    </IconButton>
                    <Button variant="contained" sx={{ width: 'auto', height: 35 }} onClick={handleOpenModalCreate}>
                        <AiOutlinePlus style={{ marginRight: '10px' }} />
                        Add New
                    </Button>
                </Box>
            </Box>

            <ModalCreatePermission open={isOpenModalCreate} onClose={handleCloseModalCreate} modules={modules} />
        </>
    )
}