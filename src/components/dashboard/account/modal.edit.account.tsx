import { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { justifyContent_space_between, styleModalRole, styleSelect } from '@/style/style_mui/table';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Switch from '@mui/material/Switch'
import { getAccountById, putUpdateAccountActions } from '@/actions/account/actions';
import { IAccount } from '@/types/dashboard';
import { TypeAccount } from '@/helper/type_account';
import CircularProgress from '@mui/material/CircularProgress';
import { formatTimeMessage } from "@/helper/formatTime";

type FormValues = {
    _id: string;
    email: string;
    name: string;
    userName: string;
    password: string;
    type: string;
    roles: string;
    failedLogin: number;
    verify?: boolean;
    createdAt: string;
    updatedAt: string;
};

type Props = {
    id: string;
    open: boolean;
    onClose: () => void;
}

const accountTypes = ['LOCAL', 'GOOGLE', 'GITHUB',]
const accountRoles = ['SUPER_ADMIN', 'NORMAL_USER']

export default function ModalEditAccount({ open, onClose, id }: Props) {

    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleOpenShowPassword = () => setShowPassword(!showPassword);
    const handleCloseShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormValues>();


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [accountTypeOld, setAccountTypeOld] = useState<string>('');
    const [accountRoleOld, setAccountRoleOld] = useState<string>('');
    const [accountVerifyOld, setAccountVerifyOld] = useState<boolean>(false);

    const handleChangeType = (event: any) => setAccountTypeOld(event?.target?.value)
    const handleChangeRole = (event: any) => setAccountRoleOld(event?.target?.value)
    const handleChangeVerify = (event: any) => setAccountVerifyOld(event?.target?.value)

    const getItemAccount = useCallback(async (id: string) => {
        try {
            const { data, error } = await getAccountById(id);
            if (error) {
                setSnackbarMessage({ type: 'error', message: error.message });
                setOpenSnackbar(true);
            }
            if (data) return data?.data;
        } catch (e) { console.log('==> error get item account: ', e) }
    }, [setSnackbarMessage, setOpenSnackbar]);
    const setValueToForm = useCallback((data: IAccount) => {
        const { _id, email, userName, type, roles, failedLogin, verifyAccount, createdAt, updatedAt } = data;
        const typeLabel = TypeAccount.find((item) => item.value === type)?.label || 'LOCAL';
        setValue('_id', _id);
        setValue('email', email);
        setValue('userName', userName);
        setValue('type', typeLabel);
        setValue('roles', roles[0]);
        setValue('failedLogin', failedLogin);
        setValue('verify', verifyAccount);
        setValue('createdAt', formatTimeMessage(createdAt));
        setValue('updatedAt', formatTimeMessage(updatedAt));
        setAccountRoleOld(roles[0]);
        setAccountTypeOld(typeLabel);
        setAccountVerifyOld(verifyAccount);
    }, [setValue, setAccountRoleOld, setAccountTypeOld, setAccountVerifyOld]);

    useEffect(() => {
        const handleData = async () => {
            setIsLoading(true);
            try {
                const item = await getItemAccount(id) as IAccount;
                setValueToForm(item);
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setIsLoading(false);
            }
        };
        if (open) handleData();
    }, [id, open, getItemAccount, setValueToForm, setAccountRoleOld, setAccountTypeOld,])

    const handleCloseModal = () => {
        setIsLoading(false);
        setAccountTypeOld('');
        setAccountRoleOld('');
        setAccountVerifyOld(false);
        reset();
        onClose();
    }
    const onSubmit: SubmitHandler<FormValues> = async (dataForm) => {
        setIsLoading(true);
        const { _id } = dataForm
        const { data, error } = await putUpdateAccountActions(_id, dataForm);
        if (error) {
            setSnackbarMessage({ type: 'error', message: error.message });
            setOpenSnackbar(true);
            setIsLoading(false);
        }
        if (data) {
            setSnackbarMessage({ type: 'success', message: data?.message });
            setOpenSnackbar(true);
            handleCloseModal();
        }
    }

    return (
        <Modal open={open} onClose={handleCloseModal} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
            <Box sx={{ ...styleModalRole, padding: '30px', maxWidth: 600, maxHeight: 900 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography id="child-modal-title" variant="h6" component="h1" sx={{ fontWeight: 700 }}>
                        Update Account
                    </Typography>
                </Box>
                {isLoading
                    ? <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Box>
                    : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ marginTop: 3 }}>
                                <Box sx={{ ...justifyContent_space_between, flexDirection: 'column' }}>
                                    <TextField
                                        id="_id"
                                        label="ID" {...register('_id', { required: true })} error={!!errors.email} helperText={errors.email ? 'Email is required' : ''}
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
                                        sx={{ width: '100%', marginTop: 2 }}
                                    />
                                    <TextField
                                        id="email"
                                        label="Email" {...register('email', { required: true })} error={!!errors.email} helperText={errors.email ? 'Email is required' : ''}
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
                                        sx={{ width: '100%', marginTop: 2 }}
                                    />
                                    <TextField
                                        id="userName"
                                        label="User Name"  {...register('userName', { required: true })} error={!!errors.userName} helperText={errors.userName ? 'UserName is required' : ''}
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
                                        sx={{ width: '100%', marginTop: 2 }}
                                    />
                                    <TextField
                                        id="failedLogin"
                                        label="Login Failed"  {...register('failedLogin', { required: true })} error={!!errors.userName} helperText={errors.userName ? 'UserName is required' : ''}
                                        variant="outlined"
                                        sx={{ width: '100%', marginTop: 2 }}
                                    />
                                    <TextField
                                        id="password"
                                        label="Password"
                                        variant="outlined"  {...register('password')}
                                        type={showPassword ? "text" : "password"}
                                        sx={{ width: '100%', marginTop: 2 }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleOpenShowPassword} onMouseDown={handleCloseShowPassword} edge="end" >
                                                        {showPassword ? <VisibilityOff sx={{ color: '#8e8e8e' }} /> : <Visibility sx={{ color: '#8e8e8e' }} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormControl sx={{ width: '100%', maxWidth: '100%', minWidth: 100, marginTop: 2 }}>
                                        <InputLabel id="method-label" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                            Type
                                        </InputLabel>
                                        <Select
                                            labelId="method-label"
                                            id="type"
                                            {...register('type', { required: true })}
                                            value={accountTypeOld}
                                            onChange={handleChangeType}
                                            sx={styleSelect}
                                            MenuProps={{ PaperProps: { style: { maxHeight: 200, overflowY: 'auto', }, }, }}
                                        >
                                            {accountTypes.map((item) => (
                                                <MenuItem key={item} value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.type && <span style={{ color: 'red' }}>Type is required</span>}
                                    </FormControl>

                                    <FormControl sx={{ width: '100%', maxWidth: '100%', minWidth: 100, marginTop: 2 }}>
                                        <InputLabel id="method-label" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                            Roles
                                        </InputLabel>
                                        <Select labelId="method-label" id="roles" {...register('roles', { required: true })} value={accountRoleOld} onChange={handleChangeRole}
                                            sx={styleSelect}
                                            MenuProps={{
                                                PaperProps: {
                                                    style: { maxHeight: 200, overflowY: 'auto', },
                                                },
                                            }}
                                        >
                                            {accountRoles.map((item) => (
                                                <MenuItem key={item} value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.type && <span style={{ color: 'red' }}>Type is required</span>}
                                    </FormControl>

                                    <FormControl sx={{ width: '100%', marginTop: 2 }}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pl: '13px' }}>
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Verify Account</Typography>
                                            <Switch
                                                id="verify"
                                                {...register('verify')}
                                                checked={accountVerifyOld}
                                                onChange={handleChangeVerify}
                                                color="primary"
                                                inputProps={{ 'aria-label': 'Verify Account' }}
                                            />
                                        </Box>
                                    </FormControl>
                                    <TextField
                                        id="createdAt"
                                        label="CreatedAd"
                                        variant="outlined"
                                        sx={{ width: '100%', marginTop: 2 }}
                                        {...register('createdAt', { required: true })}
                                        error={!!errors.userName}
                                        helperText={errors.userName ? 'FullName is required' : ''}
                                    />
                                    <TextField
                                        id="updatedAt"
                                        label="Update At"
                                        variant="outlined"
                                        sx={{ width: '100%', marginTop: 2 }}
                                        {...register('updatedAt', { required: true })}
                                        error={!!errors.userName}
                                        helperText={errors.userName ? 'FullName is required' : ''}
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: 2 }}>
                                    <Button variant="contained" color="error" sx={{ marginRight: 2 }} onClick={handleCloseModal}> Cancel </Button>
                                    <Button variant="contained" color="primary" type="submit"> Update </Button>
                                </Box>
                            </Box>
                        </form>
                    )}
            </Box>
        </Modal>
    )
}