import { useState } from 'react';
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
import { postCreateAccountAction } from '@/actions/account/actions';

type FormValues = {
    email: string;
    name: string;
    userName: string;
    password: string;
    type: string;
    roles: string;
    verify?: boolean;
};

type Props = {
    open: boolean;
    onClose: () => void;
}

const accountTypes = ['LOCAL', 'GOOGLE', 'GITHUB',]
const accountRoles = ['SUPER_ADMIN', 'NORMAL_USER']

export default function ModalCreateAccount({ open, onClose }: Props) {
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleOpenShowPassword = () => setShowPassword(!showPassword);
    const handleCloseShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormValues>();

    const handleCloseModal = () => {
        reset();
        onClose();
    }
    const onSubmit: SubmitHandler<FormValues> = async (dataForm) => {
        dataForm.verify = dataForm.verify ?? false;
        const { data, error } = await postCreateAccountAction(dataForm);
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
        <>
            <Modal open={open} onClose={handleCloseModal} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
                <Box sx={{ ...styleModalRole, padding: '30px', maxWidth: 600, maxHeight: 800 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography id="child-modal-title" variant="h6" component="h1" sx={{ fontWeight: 700 }}>
                            Create Account
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ marginTop: 3 }}>
                            <Box sx={{ ...justifyContent_space_between, flexDirection: 'column' }}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    sx={{ width: '100%', marginTop: 2 }}
                                    {...register('email', { required: true })}
                                    error={!!errors.email}
                                    helperText={errors.email ? 'Email is required' : ''}
                                />

                                <TextField
                                    id="userName"
                                    label="User Name"
                                    variant="outlined"
                                    sx={{ width: '100%', marginTop: 2 }}
                                    {...register('userName', { required: true })}
                                    error={!!errors.userName}
                                    helperText={errors.userName ? 'UserName is required' : ''}
                                />

                                <TextField
                                    id="name"
                                    label="Full Name"
                                    variant="outlined"
                                    sx={{ width: '100%', marginTop: 2 }}
                                    {...register('name', { required: true })}
                                    error={!!errors.userName}
                                    helperText={errors.userName ? 'FullName is required' : ''}
                                />

                                <TextField
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"}
                                    sx={{ width: '100%', marginTop: 2 }}
                                    {...register('password')}
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
                                        sx={styleSelect}
                                        MenuProps={{
                                            PaperProps:
                                            {
                                                style: {
                                                    maxHeight: 200,
                                                    overflowY: 'auto',
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem>None</MenuItem>
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
                                    <Select
                                        labelId="method-label"
                                        id="roles"
                                        {...register('roles', { required: true })}
                                        sx={styleSelect}
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 200,
                                                    overflowY: 'auto',
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem>None</MenuItem>
                                        {accountRoles.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.type && <span style={{ color: 'red' }}>Type is required</span>}
                                </FormControl>

                                <FormControl sx={{ width: '100%', marginTop: 2 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Verify Account</Typography>
                                        <Switch
                                            id="verify"
                                            {...register('verify')}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'Verify Account' }}
                                        />
                                    </Box>
                                </FormControl>
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