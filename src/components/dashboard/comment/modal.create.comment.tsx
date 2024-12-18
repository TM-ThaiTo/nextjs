import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { justifyContent_space_between, styleModalRole } from '@/style/style_mui/table';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';
import { createCommentByIdPost } from '@/actions/comment/action.admin'

type FormValues = {
    idUser: string;
    content: string;
    idParent?: string;
};

type Props = {
    open: boolean;
    id: string;
    onClose: () => void;
}

export default function ModalCreateCommentWithIdPost({ open, onClose, id }: Props) {
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

    const handleCloseModal = () => { reset(); onClose(); }

    const onSubmit: SubmitHandler<FormValues> = async (dataForm) => {
        const dataCreate = { ...dataForm, idPost: id };
        const { data, error } = await createCommentByIdPost(dataCreate);
        if (error) {
            setSnackbarMessage({ type: 'error', message: error?.message });
            setOpenSnackbar(true);
        }
        if (data) {
            setSnackbarMessage({ type: 'success', message: 'Create new comment success' });
            setOpenSnackbar(true);
            handleCloseModal();
        }
    }
    return (
        <>
            <Modal open={open} onClose={handleCloseModal} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
                <Box sx={{ ...styleModalRole, padding: '30px', maxWidth: 400, maxHeight: 450 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography id="child-modal-title" variant="h6" component="h1" sx={{ fontWeight: 700 }}>
                            Create Comment
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ marginTop: 3 }}>
                            <Box sx={{ ...justifyContent_space_between, flexDirection: 'column' }}>
                                <TextField
                                    label="ID Post"
                                    variant="outlined"
                                    fullWidth
                                    value={id}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                <TextField
                                    id="idUser"
                                    label="ID User"
                                    variant="outlined"
                                    sx={{ width: '100%', marginTop: 2 }}
                                    {...register('idUser', { required: true })}
                                    error={!!errors.idUser}
                                    helperText={errors.idUser ? 'Id User is required' : ''}
                                />

                                <TextField
                                    id="content"
                                    label="Content"
                                    variant="outlined"
                                    sx={{ width: '100%', marginTop: 2 }}
                                    {...register('content', { required: true })}
                                    error={!!errors.content}
                                    helperText={errors.content ? 'UserName is required' : ''}
                                />

                                <TextField
                                    id="idParent"
                                    label="ID Parent"
                                    variant="outlined"
                                    sx={{ width: '100%', marginTop: 2 }}
                                    {...register('idParent')}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: 2 }}>
                                <Button variant="contained" color="error" sx={{ marginRight: 2 }} onClick={handleCloseModal}>
                                    Cancel
                                </Button>
                                <Button variant="contained" color="primary" type="submit">
                                    Create
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    )
}