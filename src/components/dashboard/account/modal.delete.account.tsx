import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { justifyContent_space_between, styleModalRole, styleSelect } from '@/style/style_mui/table';
import { TypeAccount } from '@/helper/type_account';
import { formatTimeMessage } from "@/helper/formatTime";
import { deleteAccountActions } from '@/actions/account/actions'
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';

type Props = {
    open: boolean;
    onClose: () => void;
    data: any;
}

export default function ModalDeleteAccount({ open, onClose, data }: Props) {
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const { _id, email, roles, type, userName, verifyAccount, createdAt, updatedAt } = data;
    const typeLabel = TypeAccount.find((item) => item.value === type)?.label || 'LOCAL';
    const handleCloseModal = () => onClose();
    const handleConfirmDelete = async () => {
        const { data, error } = await deleteAccountActions(_id);
        if (error) {
            setSnackbarMessage({ type: 'error', message: error?.message });
            setOpenSnackbar(true);
        }
        if (data) {
            setSnackbarMessage({ type: 'success', message: data?.message });
            setOpenSnackbar(true);
            handleCloseModal();
        }
    }

    return (
        <Modal open={open} onClose={handleCloseModal} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
            <Box sx={{ ...styleModalRole, padding: '30px', maxWidth: 600, maxHeight: 800 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography id="child-modal-title" variant="h6" component="h1" sx={{ fontWeight: 700 }}> Confirm Delete Account </Typography>
                </Box>

                <Box>
                    <TextField id="_id" label="ID" value={_id} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                    <TextField id="email" label="Email" value={email} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                    <TextField id="roles" label="Roles" value={roles[0]} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                    <TextField id="type" label="Type" value={typeLabel} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                    <TextField id="userName" label="User Name" value={userName} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                    <TextField id="verifyAccount" label="Verify Account" value={verifyAccount ? "true" : "false"} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                    <TextField id="createdAt" label="Created At" value={formatTimeMessage(createdAt) || "now"} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                    <TextField id="updatedAt" label="Updated At" value={formatTimeMessage(updatedAt) || "now"} variant="outlined" sx={{ width: '100%', marginTop: 2 }} InputProps={{ readOnly: true }} />
                </Box>

                <Box display="flex" justifyContent="space-between" mt={3}>
                    <Button variant="contained" color="secondary" onClick={handleConfirmDelete}> Delete </Button>
                    <Button variant="outlined" onClick={handleCloseModal}> Cancel </Button>
                </Box>
            </Box>
        </Modal>
    )
}