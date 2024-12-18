import React from 'react';
import { Box, IconButton, Popover, Tooltip } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ReportIcon from '@mui/icons-material/Report';
import Link from 'next/link';
import { useRouter } from '@/utils/hooks/router/useRouter';

import { FaClipboardList } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    id: string | undefined;
    open: boolean;
    anchorEl: HTMLElement | null;
    currentRowId: { id: string; slug: string; idUser: string } | undefined;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    handleClose: () => void;
};

export default function ActionTablePostDashboard({ id, open, anchorEl, currentRowId, handleClick, handleClose, }: Props) {
    const router = useRouter();

    const handleEdit = (id: string) => {
        console.log(`Edit row with id: ${id}`);
    };

    const handleDelete = (id: string) => {
        console.log(`Delete row with id: ${id}`);
    };

    const handleReport = (id: string, idUser: string) => {
        console.log('check report: id ', id, "idUser: ", idUser);
    }

    const handleSeeListComment = (id: string) => {
        console.log('check handleSeeListComment: ', id);
        router.push(`/dashboard/post/comment/${id}`)
    }

    const handleSeeListLike = (id: string) => {
        console.log('check handleSeeListLike: ', id);
        router.push(`/dashboard/post/like/${id}`)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <IconButton onClick={handleClick}>
                <FaBars />
            </IconButton>
            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Box sx={{ p: 1, display: 'flex' }}>
                    <Tooltip title='See post' placement="top">
                        <Link href={`/post/${currentRowId?.slug}`} target='_blank' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <RemoveRedEyeIcon sx={{ color: '#6a6a6a' }} />
                        </Link>
                    </Tooltip>
                    <Tooltip title='See list comments' placement="top">
                        <IconButton onClick={() => handleSeeListComment(currentRowId?.id!)}>
                            <FaClipboardList style={{ color: '#6a6a6a' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='See list likes' placement="top">
                        <IconButton onClick={() => handleSeeListLike(currentRowId?.id!)}>
                            <AiFillLike style={{ color: 'rgb(3 127 255)' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Edit post' placement="top">
                        <IconButton onClick={() => { handleEdit(currentRowId?.id!); handleClose(); }}>
                            <EditIcon sx={{ color: 'green' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete post' placement="top">
                        <IconButton onClick={() => { handleDelete(currentRowId?.id!); handleClose(); }}>
                            <DeleteIcon sx={{ color: 'red' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Report post' placement="top">
                        <IconButton onClick={() => { handleReport(currentRowId?.id!, currentRowId?.idUser!); handleClose(); }}>
                            <ReportIcon sx={{ color: 'red' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Popover>
        </Box>
    );
};