'use client';

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { AiOutlineReload, AiOutlinePlus } from "react-icons/ai";
import { IPermissions } from "@/types/dashboard";
import ModalCreateRole from "./modal.create.role";

type Props = {
    permissions?: IPermissions;
    dashboards?: IPermissions;
}

export default function TopTableRole({ permissions, dashboards }: Props) {
    const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
    const handleOpenModalCreate = () => setIsOpenModalCreate(true);
    const handleCloseModalCreate = () => setIsOpenModalCreate(false);

    const handleReloadRoles = () => {
    }
    if (!permissions || !dashboards) return null;

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '10px', height: 75 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 1000, fontSize: '1.5rem' }}>
                    Role List
                </Typography>

                <Box>
                    <IconButton onClick={handleReloadRoles}>
                        <AiOutlineReload style={{ color: 'black' }} />
                    </IconButton>
                    <Button variant="contained" sx={{ width: 'auto', height: 35 }} onClick={handleOpenModalCreate}>
                        <AiOutlinePlus style={{ marginRight: '10px' }} />
                        Add New
                    </Button>
                </Box>
            </Box>
            <ModalCreateRole
                open={isOpenModalCreate}
                onClose={handleCloseModalCreate}
                dataPermission={permissions}
                dataDashboard={dashboards}
            />
        </>
    )
}