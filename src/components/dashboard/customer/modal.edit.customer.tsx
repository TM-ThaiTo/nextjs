import { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { styleModalRole, justifyContent_space_between } from '@/style/style_mui/table';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';
import { getCustomerById, putUpdateCustomer } from '@/actions/customer/actions.admin';
import { ICustomer } from '@/types/dashboard';
import { formatTimeMessage, removeTimeFromISOString } from "@/helper/formatTime";

type Props = {
    id: string;
    open: boolean;
    onClose: () => void;
}

export default function ModalEditCustomer({ open, onClose, id }: Props) {
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<ICustomer>();
    const [isLoading, setIsLoading] = useState(false);

    const handleCloseModal = () => { setIsLoading(false); reset(); onClose(); };
    const getItemCustomer = useCallback(async (id: string) => {
        try {
            const { data, error } = await getCustomerById(id);
            if (error) {
                setSnackbarMessage({ type: 'error', message: error.message });
                setOpenSnackbar(true);
            }
            if (data) return data?.data;
        } catch (e) { console.error('==> error get item account: ', e) }
    }, [setSnackbarMessage, setOpenSnackbar]);
    const setICustomer = useCallback((data: ICustomer) => {
        Object.keys(data).forEach((key) => { setValue(key as keyof ICustomer, data[key as keyof ICustomer] as any); });
        setValue('birthDay', removeTimeFromISOString(data?.birthDay));
        setValue('createdAt', formatTimeMessage(data.createdAt));
        setValue('updatedAt', formatTimeMessage(data.updatedAt));
    }, [setValue]);
    const fetchCustomerData = useCallback(async () => {
        setIsLoading(true);
        try {
            const item = await getItemCustomer(id) as ICustomer;
            if (item) setICustomer(item);
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading, setICustomer, getItemCustomer, id]);

    useEffect(() => { if (open) fetchCustomerData(); }, [open, fetchCustomerData]);
    const onSubmit: SubmitHandler<ICustomer> = async (dataForm) => {
        setIsLoading(true);
        try {
            const { data, error } = await putUpdateCustomer(dataForm);
            if (data) {
                setSnackbarMessage({ type: 'success', message: data?.message })
                setOpenSnackbar(true);
                handleCloseModal();
            }
            if (error) {
                setSnackbarMessage({ type: 'error', message: error?.message })
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('error: ', error)
            setSnackbarMessage({ type: 'error', message: 'onSubmit Edit customer error' })
            setOpenSnackbar(true);
        }
    };
    const formFields = [
        { id: '_id', label: 'ID', required: true, readOnly: true },
        { id: 'slug', label: 'User Name', required: true, readOnly: true },
        { id: 'idAccount', label: 'Id Account', required: true, readOnly: true },
        { id: 'fullName', label: 'Full Name', required: false },
        { id: 'phone', label: 'Phone', required: false },
        { id: 'birthDay', label: 'Birth Day', required: false, type: 'date' },
        { id: 'address', label: 'Address', required: false, },
        { id: 'bio', label: 'Bio', required: false, },
        { id: 'follower', label: 'Follower', required: false, readOnly: true },
        { id: 'following', label: 'Following', required: false, readOnly: true },
        { id: 'posts', label: 'Posts', required: false, readOnly: true },
        { id: 'status', label: 'Status', required: false },
        { id: 'avatar', label: 'Avatar', required: false },
        { id: 'background', label: 'Background', required: false },
        { id: 'reports', label: 'Reports', required: false, readOnly: true },
        { id: 'createdAt', label: 'Created At', required: true, readOnly: true },
        { id: 'updatedAt', label: 'Updated At', required: true, readOnly: true }
    ];
    return (
        <Modal open={open} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box sx={{ ...styleModalRole, padding: '30px', maxWidth: 600, maxHeight: 900 }}>
                <Typography id="modal-title" variant="h6" sx={{ fontWeight: 700, textAlign: 'center' }}>
                    Update Customer
                </Typography>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {formFields.map(({ id, label, readOnly, type, required }) => (
                            <TextField
                                key={id}
                                id={id}
                                label={label}
                                type={type === 'date' ? 'date' : 'text'}
                                {...register(id as keyof ICustomer, { required })}
                                error={required ? !!errors[id as keyof ICustomer] : false}
                                helperText={required && errors[id as keyof ICustomer] ? `${label} is required` : ''} // Hiển thị helperText nếu có lỗi và required là true
                                variant="outlined"
                                InputProps={{ readOnly }}
                                sx={{
                                    width: '100%', mt: 2,
                                    backgroundColor: readOnly ? 'grey.200' : 'transparent'
                                }}
                            />
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button variant="contained" color="error" onClick={handleCloseModal} sx={{ mr: 2 }}>Cancel</Button>
                            <Button variant="contained" color="primary" type="submit">Update</Button>
                        </Box>
                    </form>
                )}
            </Box>
        </Modal>
    );
}
