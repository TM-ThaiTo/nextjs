'use client';

import React, { useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Tooltip from '@mui/material/Tooltip';
import { ICustomer } from '@/types/dashboard';
import { itemTable } from '@/style/style_mui/table';
import { formatTimeDifference, formatTimeMessage } from '@/helper/formatTime';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import ModalEditCustomer from './modal.edit.customer';

type Props = {
    data: ICustomer[];
};

export default function MainPageCustomer({ data }: Props) {

    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const [idEdit, setIdEdit] = useState<string>('');
    const handleOpenEdit = () => setIsOpenEdit(true);
    const handleCloseEdit = () => setIsOpenEdit(false);

    const handleOpenEditCustomer = (id: string) => {
        setIdEdit(id);
        handleOpenEdit();
    }

    return (
        <>
            <TableBody>
                {data.map((row) => {
                    const { _id, fullName, slug, idAccount, follower, following, posts, reports, createdAt, updatedAt } = row;
                    return (
                        <TableRow key={_id}>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={_id} placement="top">
                                    <span>{_id}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={fullName} placement="top">
                                    <span>{fullName}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={slug} placement="top">
                                    <span>{slug}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={idAccount} placement="top">
                                    <span>{idAccount}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={`${follower} follower`} placement="top">
                                    <span>{follower}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={`${following} following`} placement="top">
                                    <span>{following}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={`${posts} posts`} placement="top">
                                    <span>{posts}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="left" sx={itemTable}>
                                <Tooltip title={`${reports} reports`} placement="top">
                                    <span>{reports}</span>
                                </Tooltip>
                            </TableCell>

                            <TableCell key={`${_id}-9`} align="left" sx={itemTable}>
                                <Tooltip title={formatTimeMessage(createdAt)} placement="top">
                                    <span>{formatTimeDifference(createdAt, 2)}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell key={`${_id}-10`} align="left" sx={itemTable}>
                                <Tooltip title={formatTimeMessage(updatedAt)} placement="top">
                                    <span>{formatTimeDifference(updatedAt, 2)}</span>
                                </Tooltip>
                            </TableCell>

                            <TableCell align="left" sx={{ ...itemTable, maxWidth: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Tooltip title="See Customer" placement="top">
                                    <Link href={`/${slug}`} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <RemoveRedEyeIcon sx={{ color: '#6a6a6a' }} />
                                    </Link>
                                </Tooltip>
                                <Tooltip title="Edit Customer" placement="top">
                                    <IconButton onClick={() => handleOpenEditCustomer(_id)}>
                                        <EditIcon sx={{ color: 'green' }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Customer" placement="top">
                                    <IconButton>
                                        <DeleteIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            {isOpenEdit && idEdit && <ModalEditCustomer open={isOpenEdit} onClose={handleCloseEdit} id={idEdit} />}
        </>
    );
}
