
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styleModalRole } from "@/style/style_mui/table";
import { deletePermissionAction } from '@/actions/permission/actions';
import { formatTimeMessage } from "@/helper/formatTime";
import useSnackbar from "@/utils/hooks/snackbar/useSnackbar";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
    open: boolean;
    onClose: () => void;
    item: any;
};

export default function ModalDeletePermission({ open, onClose, item }: Props) {
    const { _id, permissionName, module, endpoint, method, description, createdAt, updatedAt } = item;
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const handleCloseModal = () => onClose();

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await deletePermissionAction(_id);

            if (error) {
                setSnackbarMessage({ type: 'error', message: error.message });
                setOpenSnackbar(true);
                setIsLoading(false);
                return;
            }
            if (data) {
                setSnackbarMessage({ type: 'success', message: 'Permission deleted successfully' });
                setOpenSnackbar(true);
                setIsLoading(false);
                handleCloseModal();
            }

        } catch (error) {
            setSnackbarMessage({ type: 'error', message: 'Error delete' });
            setOpenSnackbar(true);
            setIsLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={handleCloseModal} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
            <Box sx={{ ...styleModalRole, padding: '30px', maxWidth: 600, maxHeight: '80vh' }}>
                <Typography id="child-modal-title" variant="h6" component="h2" gutterBottom>
                    Confirm Delete Permission
                </Typography>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <CircularProgress color="secondary" />
                    </Box>
                ) : (
                    <Box>
                        <TextField id="_id" label="ID" value={_id} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                        <TextField id="permissionName" label="Permission Name" value={permissionName} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                        <TextField id="module" label="Module" value={module} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                        <TextField id="endpoint" label="Endpoint" value={endpoint} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                        <TextField id="method" label="Method" value={method} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                        <TextField id="description" label="Description" value={description} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                        <TextField id="description" label="Description" value={description} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                        <TextField id="createdAt" label="Created At" value={formatTimeMessage(createdAt) || "now"} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                        <TextField id="updatedAt" label="Updated At" value={formatTimeMessage(updatedAt) || "now"} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                        <Box display="flex" justifyContent="space-between" mt={3}>
                            <Button variant="contained" color="secondary" onClick={handleDelete}> Delete </Button>
                            <Button variant="outlined" onClick={handleCloseModal}> Cancel </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Modal>
    );
}
