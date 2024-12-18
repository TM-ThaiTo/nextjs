import React from 'react';
import { Box, IconButton, Popover, Tooltip } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import { useRouter } from '@/utils/hooks/router/useRouter';
import { FaBars } from "react-icons/fa";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCommentByIdPost } from "@/actions/comment/action.admin";
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';

type Props = {
    id: string | undefined;
    open: boolean;
    anchorEl: HTMLElement | null;
    currentRowId: { id: string; slug: string; idUser: string } | undefined;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
    handleClose: () => void;
};

export default function ActionsTableConversations({ id, open, anchorEl, currentRowId, handleClick, handleClose, }: Props) {
    const router = useRouter();
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();

    const handleEdit = (id: string) => {

    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(`Are you sure you want to delete the row with id: ${id}?`);
        if (confirmed) {
            const { data, error } = await deleteCommentByIdPost(id);
            if (error) {
                setSnackbarMessage({ type: 'error', message: error?.message });
                setOpenSnackbar(true);
            }
            if (data) {
                // setSnackbarMessage({ type: 'success', message: data?.message });
                // setOpenSnackbar(true);
                console.log('Delete row success, ', data);
            }
        } else {
            console.log(`Deletion of row with id: ${id} was canceled.`);
        }
    };

    const handleReport = (id: string, idUser: string) => {
        console.log('check report: id ', id, "idUser: ", idUser);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <IconButton onClick={handleClick} sx={{ color: 'black' }}>
                <FaBars />
            </IconButton>
            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Box sx={{ p: 1, display: 'flex' }}>
                    <Tooltip title='Edit Comment' placement="top">
                        <IconButton onClick={() => { handleEdit(currentRowId?.id!); handleClose(); }}>
                            <EditIcon sx={{ color: 'green' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete Comment' placement="top">
                        <IconButton onClick={() => { handleDelete(currentRowId?.id!); handleClose(); }}>
                            <DeleteIcon sx={{ color: 'red' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Report Comment' placement="top">
                        <IconButton onClick={() => { handleReport(currentRowId?.id!, currentRowId?.idUser!); handleClose(); }}>
                            <ReportIcon sx={{ color: 'red' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Popover>
        </Box>
    );
};