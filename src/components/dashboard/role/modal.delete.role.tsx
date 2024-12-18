
import React, { useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styleModalRole } from "@/style/style_mui/table";
import { deleteRoleAction } from '@/actions/role/actions';
import { formatTimeMessage } from "@/helper/formatTime";
import useSnackbar from "@/utils/hooks/snackbar/useSnackbar";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
    open: boolean;
    onClose: () => void;
    item: any;
};

export default function ModalDeleteRole({ open, onClose, item }: Props) {
    const { _id, roleName, description, createdAt, updatedAt } = item;
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const handleCloseModal = () => onClose();

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await deleteRoleAction(_id);

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
                    Confirm Delete Role
                </Typography>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <CircularProgress color="secondary" />
                    </Box>
                ) : (
                    <Box>
                        <TextField
                            id="_id"
                            label="ID"
                            variant="outlined"
                            value={_id}
                            sx={{ width: '100%', marginTop: 2 }}
                            InputProps={{ readOnly: true }} // Making it read-only as it's not meant to be edited
                        />
                        <TextField
                            id="roleName"
                            label="Role Name"
                            variant="outlined"
                            value={roleName}
                            sx={{ width: '100%', marginTop: 2 }}
                            InputProps={{ readOnly: true }}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            value={description}
                            sx={{ width: '100%', marginTop: 2 }}
                            InputProps={{ readOnly: true }}
                        />
                        <TextField
                            id="createdAt"
                            label="Created At"
                            variant="outlined"
                            value={formatTimeMessage(createdAt) || "now"}
                            sx={{ width: '100%', marginTop: 2 }}
                            InputProps={{ readOnly: true }}
                        />
                        <TextField
                            id="updatedAt"
                            label="Updated At"
                            variant="outlined"
                            value={formatTimeMessage(updatedAt) || "now"}
                            sx={{ width: '100%', marginTop: 2 }}
                            InputProps={{ readOnly: true }}
                        />

                        <Box display="flex" justifyContent="space-between" mt={3}>
                            <Button variant="contained" color="secondary" onClick={handleDelete}>
                                Delete
                            </Button>
                            <Button variant="outlined" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Modal>
    );
}
