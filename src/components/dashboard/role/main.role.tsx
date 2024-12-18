'use client';


import React, { useState, useMemo } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Tooltip from '@mui/material/Tooltip';
import { IPermissions, IRole } from '@/types/dashboard';
import { boxActionTable, itemTable, styleButtonReset } from '@/style/style_mui/table';
import { formatTimeDifference, formatTimeMessage } from '@/helper/formatTime';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteRoleAction } from '@/actions/role/actions';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';
import ModalUpdateRole from '@/components/dashboard/role/modal.update.role';
import ModalDeleteRole from './modal.delete.role';

type Props = {
    dataRole: IRole[];
}

export default function MainRoleComponent({ dataRole }: Props) {
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();

    // const [itemEdit, setItemEdit] = useState<IRole | null>(null);
    const [idEdit, setIdEdit] = useState<string>('');
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
    const handleOpenModalEdit = () => setIsOpenModalEdit(true);
    const handleCloseModalEdit = () => {
        setIsOpenModalEdit(false);
        // setItemEdit(null);
        setIdEdit('')
    }

    const [itemDelete, setItemDelete] = useState<any>({});
    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
    const handleOpenModalDeleteRole = () => setIsOpenDelete(true);
    const handleCloseModalDeleteRole = () => {
        setIsOpenDelete(false);
        setItemDelete({});
    }

    const handleEditRole = (id: string) => {
        setIdEdit(id);
        handleOpenModalEdit();
    }

    const handleDeleteRole = async (row: any) => {
        setItemDelete(row);
        handleOpenModalDeleteRole();
    }

    return (
        <>
            <TableBody>
                {dataRole.map((row) => {
                    const { _id, roleName, active, description, createdAt, updatedAt } = row;
                    return (
                        <TableRow key={_id}>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={_id} placement="top">
                                    <span>{_id}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={roleName} placement="top">
                                    <span>{roleName}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                {active ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={description} placement="top">
                                    <span>{description}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={formatTimeMessage(createdAt)} placement="top">
                                    <span>{formatTimeDifference(createdAt, 2)}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={formatTimeMessage(updatedAt)} placement="top">
                                    <span>{formatTimeDifference(updatedAt, 2)}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title="Edit Role" placement="top">
                                    <IconButton onClick={() => handleEditRole(_id)}>
                                        <EditIcon sx={{ color: 'green' }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Role" placement="top">
                                    <IconButton onClick={() => handleDeleteRole(row)}>
                                        <DeleteIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>

            {isOpenModalEdit && idEdit && <ModalUpdateRole open={isOpenModalEdit} onClose={handleCloseModalEdit} id={idEdit} />}
            {isOpenDelete && itemDelete && <ModalDeleteRole open={isOpenDelete} onClose={handleCloseModalDeleteRole} item={itemDelete} />}
        </>
    )
}