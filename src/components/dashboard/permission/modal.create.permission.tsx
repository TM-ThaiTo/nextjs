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
import { methods } from '@/constants/list_method';
import { postCreatePermissionAction } from '@/actions/permission/actions';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';

type FormValues = {
    selectedModule: string;
    selectedMethod: string;
    permissionName: string;
    endpoint: string;
    description: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
    modules: string[];
};

export default function ModalCreatePermission({ open, onClose, modules }: Props) {
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormValues>();
    const [isAddingNewModule, setIsAddingNewModule] = useState<boolean>(false);

    const handleModuleChange = (event: any) => {
        const selectedModule = event.target.value;
        if (selectedModule === 'add-new-module') {
            setIsAddingNewModule(true);
            setValue('selectedModule', '');
        } else {
            setIsAddingNewModule(false);
            setValue('selectedModule', selectedModule);
        }
    };

    const handleCloseModal = () => {
        reset();
        onClose();
    };

    const onSubmit: SubmitHandler<FormValues> = async (dataForm) => {
        const { selectedModule, permissionName, selectedMethod, endpoint, description } = dataForm;
        const dataSubmit = {
            module: selectedModule,
            permissionName: permissionName,
            method: selectedMethod,
            endpoint: endpoint,
            description: description,
        }
        const { data, error } = await postCreatePermissionAction(dataSubmit);
        if (error) {
            if (error.statusCode === 401) {
                setSnackbarMessage({ type: 'error', message: error.message });
                setOpenSnackbar(true);
            }
            setSnackbarMessage({ type: 'error', message: error.message });
            setOpenSnackbar(true);
        }
        if (data) {
            setSnackbarMessage({ type: 'success', message: 'Create permission successfully' });
            setOpenSnackbar(true);
            handleCloseModal();
        };
    };

    return (
        <Modal open={open} onClose={handleCloseModal} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
            <Box sx={{ ...styleModalRole, padding: '30px', maxWidth: 600, maxHeight: 600 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography id="child-modal-title" variant="h6" component="h1" sx={{ fontWeight: 700 }}>
                        Create Permission
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ marginTop: 3 }}>
                        <Box sx={justifyContent_space_between}>
                            <FormControl sx={{ width: '100%', maxWidth: '45%', minWidth: 100, marginRight: '10px' }}>
                                <InputLabel id="method-label" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                    Method
                                </InputLabel>
                                <Select
                                    labelId="method-label"
                                    id="method"
                                    {...register('selectedMethod', { required: true })}
                                    sx={styleSelect}
                                    MenuProps={{ PaperProps: { style: { maxHeight: 200, overflowY: 'auto', }, }, }}
                                >
                                    {methods.map((method) => (
                                        <MenuItem key={method} value={method}>
                                            {method}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.selectedMethod && <span style={{ color: 'red' }}>Method is required</span>}
                            </FormControl>

                            <FormControl sx={{ width: '100%', maxWidth: '45%', minWidth: 100 }}>
                                <InputLabel id="module-label" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                    Module
                                </InputLabel>
                                <Select
                                    labelId="module-label"
                                    id="module"
                                    {...register('selectedModule', { required: true })}
                                    onChange={handleModuleChange}
                                    MenuProps={{ PaperProps: { style: { maxHeight: 200, overflowY: 'auto', }, }, }}
                                    sx={styleSelect}
                                >
                                    {modules.map((module) => (
                                        <MenuItem key={module} value={module}>
                                            {module}
                                        </MenuItem>
                                    ))}
                                    <MenuItem value="add-new-module" sx={{ fontWeight: 'bold', color: 'blue' }}>
                                        Add new module
                                    </MenuItem>
                                </Select>
                                {errors.selectedModule && <span style={{ color: 'red' }}>Module is required</span>}
                            </FormControl>
                        </Box>

                        {isAddingNewModule && (
                            <TextField
                                id="newModule"
                                label="New Module"
                                variant="outlined"
                                sx={{ width: '100%', marginTop: 2 }}
                                {...register('selectedModule', { required: isAddingNewModule })}
                                error={!!errors.selectedModule}
                                helperText={errors.selectedModule ? 'Module is required' : ''}
                            />
                        )}

                        <TextField
                            id="permissionName"
                            label="Permission Name"
                            variant="outlined"
                            sx={{ width: '100%', marginTop: 2 }}
                            {...register('permissionName', { required: true })}
                            error={!!errors.permissionName}
                            helperText={errors.permissionName ? 'Permission name is required' : ''}
                        />

                        <TextField
                            id="endpoint"
                            label="Endpoint"
                            variant="outlined"
                            sx={{ width: '100%', marginTop: 2 }}
                            {...register('endpoint', { required: true })}
                            error={!!errors.endpoint}
                            helperText={errors.endpoint ? 'Endpoint is required' : ''}
                        />

                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            sx={{ width: '100%', marginTop: 2 }}
                            {...register('description')}
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
                </form>
            </Box>
        </Modal>
    );
}
