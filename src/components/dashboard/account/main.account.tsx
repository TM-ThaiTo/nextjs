'use client';

import React, { useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { IAccount } from '@/types/dashboard';
import { itemTable } from '@/style/style_mui/table';
import { formatTimeDifference, formatTimeMessage } from '@/helper/formatTime';
import { TypeAccount } from '@/helper/type_account';
import IconButton from '@mui/material/IconButton';
import ModalDeleteAccount from './modal.delete.account';
import ModalEditAccount from './modal.edit.account';

type Props = { data: IAccount[]; }
export default function MainAccountDashboard({ data }: Props) {

    const [isOpenDeleteAccount, setIsOpenDeleteAccount] = useState<boolean>(false);
    const [dataItemDelete, setDataItemDelete] = useState<any>();
    const handleOpenModalDelete = () => setIsOpenDeleteAccount(true);
    const handleCloseModalDelete = () => setIsOpenDeleteAccount(false);

    const handleOpenDelete = (row: any) => {
        setDataItemDelete(row);
        handleOpenModalDelete();
    }

    const [isOpenEditAccount, setIsEditAccount] = useState<boolean>(false);
    const [idItemEdit, setIdItemEdit] = useState<string>('');
    const handleOpenModalEdit = () => setIsEditAccount(true);
    const handleCloseModalEdit = () => setIsEditAccount(false);
    const handleOpenEdit = (row: any) => {
        setIdItemEdit(row?._id);
        handleOpenModalEdit();
    }

    return (
        <>
            <TableBody>
                {data?.map((row) => {
                    const { _id, email, userName, type, roles, failedLogin, verifyAccount, createdAt, updatedAt } = row;
                    const typeLabel = TypeAccount.find((item) => item.value === type)?.label || 'LOCAL';
                    return (
                        <TableRow key={_id}>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={_id} placement="top">
                                    <span>{_id}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={email} placement="top">
                                    <span> {email}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={userName} placement="top">
                                    <span>{userName}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={typeLabel} placement="top">
                                    <span>{typeLabel}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={roles} placement="top">
                                    <span>{roles}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" sx={itemTable}>
                                <Tooltip title={`Login failed ${failedLogin}`} placement="top">
                                    <span>{failedLogin}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" sx={itemTable}>
                                <Tooltip title={verifyAccount ? 'Verify Account' : 'Not Verify Account'} placement="top">
                                    {verifyAccount ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" sx={itemTable}>
                                <Tooltip title={formatTimeMessage(createdAt)} placement="top">
                                    <span>{formatTimeDifference(createdAt, 2)}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" sx={itemTable}>
                                <Tooltip title={formatTimeMessage(updatedAt)} placement="top">
                                    <span>{formatTimeDifference(updatedAt, 2)}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="right" sx={itemTable}>
                                <Tooltip title="Edit Account" placement="top">
                                    <IconButton onClick={() => handleOpenEdit(row)} >
                                        <EditIcon sx={{ color: 'green' }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Account" placement="top">
                                    <IconButton onClick={() => handleOpenDelete(row)} >
                                        <DeleteIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            {isOpenEditAccount && idItemEdit && <ModalEditAccount open={isOpenEditAccount} onClose={handleCloseModalEdit} id={idItemEdit} />}
            {isOpenDeleteAccount && dataItemDelete && <ModalDeleteAccount open={isOpenDeleteAccount} onClose={handleCloseModalDelete} data={dataItemDelete} />}
        </>
    );
}