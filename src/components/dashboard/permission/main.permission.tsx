'use client';
import React, { useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import methodColors from '@/helper/methodColors';
import IconButton from '@mui/material/IconButton';
import { IPermission } from "@/types/dashboard";
import { itemTable } from '@/style/style_mui/table';
import { formatTimeMessage } from '@/helper/formatTime';
import ModalEditPermission from '@/components/dashboard/permission/modal.edit.permission';
import ModalDeletePermission from '@/components/dashboard/permission/modal.delete.permission';

type Props = {
    permissions: IPermission[];
};

export default function MainPermissionPage({ permissions }: Props) {
    const [idEdit, setIdEdit] = useState<string>('');
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
    const handleOpenModalEdit = () => setIsOpenModalEdit(true);
    const handleCloseModalEdit = () => {
        setIsOpenModalEdit(false);
        setIdEdit('');
    }

    const [itemDelete, setItemDelete] = useState<any>({});
    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
    const handleOpenModalDeletePermission = () => setIsOpenDelete(true);
    const handleCloseModalDeletePermission = () => {
        setIsOpenDelete(false);
        setItemDelete({});
    }

    const handleEditPermission = (id: string) => {
        setIdEdit(id);
        handleOpenModalEdit();
    }

    const handleDeletePermission = async (id: string, item: any) => {
        setItemDelete(item);
        handleOpenModalDeletePermission();
    }

    return (
        <>
            <TableBody>
                {permissions.map((item) => {
                    const { _id, permissionName, module, endpoint, method, description, createdAt, updatedAt } = item;
                    const color = methodColors[method] || 'black';
                    return (
                        <TableRow key={_id}>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={_id} placement="top">
                                    <span>{_id}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={module} placement="top">
                                    <span>{module}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={permissionName} placement="top">
                                    <span>{permissionName}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={{ color: color, fontWeight: 1000, mr: 1 }}>
                                <Tooltip title={method} placement="top">
                                    <span>{method}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={endpoint} placement="top">
                                    <span>{endpoint}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={description} placement="top">
                                    <span>{description}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                {createdAt ? formatTimeMessage(createdAt) : "now"}
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                {updatedAt ? formatTimeMessage(updatedAt) : "now"}
                            </TableCell>

                            <TableCell align="left" sx={{ ...itemTable, maxWidth: 150 }}>
                                <IconButton onClick={() => handleEditPermission(_id)} >
                                    <Tooltip title="Edit Permission" placement="top">
                                        <EditIcon sx={{ color: 'green' }} />
                                    </Tooltip>
                                </IconButton>
                                <IconButton onClick={() => handleDeletePermission(_id, item)} >
                                    <Tooltip title="Delete Permission" placement="top">
                                        <DeleteIcon sx={{ color: 'red' }} />
                                    </Tooltip>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>

            <ModalEditPermission open={isOpenModalEdit} onClose={handleCloseModalEdit} id={idEdit} />
            <ModalDeletePermission open={isOpenDelete} onClose={handleCloseModalDeletePermission} item={itemDelete} />
        </>
    );
}