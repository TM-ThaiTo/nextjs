import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { IPermissions, IRole } from '@/types/dashboard';
import { itemBoxMethod, styleModalRole, buttonCreateOrEditRole, expandRole } from '@/style/style_mui/table';
import methodColors from '@/helper/methodColors';
import { postCreateRoleAction } from '@/actions/role/actions';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';

type Props = {
    open: boolean;
    onClose: () => void;
    dataPermission: IPermissions;
    dataDashboard: IPermissions;
};

export default function ModalCreateRole({ open, onClose, dataPermission, dataDashboard }: Props) {
    const { moduleNameList, groupedPermissions } = dataPermission;
    const { moduleNameList: dashboardModuleNameList, groupedPermissions: dashboardGroupedPermissions } = dataDashboard;

    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();

    const [selectedPermissions, setSelectedPermissions] = useState<{ [moduleName: string]: { [permissionId: string]: boolean }; }>({});
    const [expandedModulesDashboard, setExpandedModulesDashboard] = useState<{ [moduleName: string]: boolean; }>({});

    const [selectedDashboardPermissions, setSelectedDashboardPermissions] = useState<{ [moduleName: string]: { [permissionId: string]: boolean }; }>({});
    const [expandedModules, setExpandedModules] = useState<{ [moduleName: string]: boolean; }>({});

    const [isActived, setIsActived] = useState<boolean>(false);
    const [isRoleName, setIsRoleName] = useState<string>('');
    const [isDescription, setIsDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleActive = () => setIsActived(!isActived);
    const handleRoleName = (e: React.ChangeEvent<HTMLInputElement>) => setIsRoleName(e.target.value);
    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => setIsDescription(e.target.value);


    const handleDashboardModuleToggle = (moduleName: string) => {
        const allSelected = dashboardGroupedPermissions[moduleName].every((perm) => selectedDashboardPermissions[moduleName]?.[perm._id]);
        const updatedModulePermissions = dashboardGroupedPermissions[moduleName].reduce((acc, perm) => {
            acc[perm._id] = !allSelected;
            return acc;
        }, {} as { [permissionId: string]: boolean });

        setSelectedDashboardPermissions({
            ...selectedDashboardPermissions,
            [moduleName]: updatedModulePermissions,
        });
    }
    const handleDashboardPermissionToggle = (moduleName: string, permissionId: string) => {
        setSelectedDashboardPermissions({
            ...selectedDashboardPermissions,
            [moduleName]: {
                ...selectedDashboardPermissions[moduleName],
                [permissionId]: !selectedDashboardPermissions[moduleName]?.[permissionId],
            },
        });
    }
    const toggleExpandDashboardModule = (moduleName: string) => {
        setExpandedModulesDashboard((prevState) => ({
            ...prevState,
            [moduleName]: !prevState[moduleName],
        }));
    }

    const handleModuleToggle = (moduleName: string) => {
        const allSelected = groupedPermissions[moduleName].every((perm) => selectedPermissions[moduleName]?.[perm._id]);
        const updatedModulePermissions = groupedPermissions[moduleName].reduce((acc, perm) => {
            acc[perm._id] = !allSelected;
            return acc;
        }, {} as { [permissionId: string]: boolean });

        setSelectedPermissions({
            ...selectedPermissions,
            [moduleName]: updatedModulePermissions,
        });

    };
    const handlePermissionToggle = (moduleName: string, permissionId: string) => {
        setSelectedPermissions({
            ...selectedPermissions,
            [moduleName]: {
                ...selectedPermissions[moduleName],
                [permissionId]: !selectedPermissions[moduleName]?.[permissionId],
            },
        });
    };
    const toggleExpandModule = (moduleName: string) => {
        setExpandedModules((prevState) => ({
            ...prevState,
            [moduleName]: !prevState[moduleName],
        }));
    };

    const handleCloseModal = () => {
        setIsLoading(false);
        setIsRoleName('');
        setIsActived(false);
        setIsDescription('');

        setSelectedPermissions({});
        setExpandedModules({});

        setSelectedDashboardPermissions({});
        setExpandedModulesDashboard({});

        onClose();
    }
    const handleSave = async () => {
        setIsLoading(true);

        try {
            const idPermissions = Object.values(selectedPermissions).reduce((acc, module) => {
                const permissions = Object.entries(module)
                    .filter(([, value]) => value)
                    .map(([permissionId]) => permissionId);
                return [...acc, ...permissions];
            }, [] as string[])

            const idDashboards = Object.values(selectedDashboardPermissions).reduce((acc, module) => {
                const permissions = Object.entries(module)
                    .filter(([, value]) => value)
                    .map(([permissionId]) => permissionId);
                return [...acc, ...permissions];
            }, [] as string[])

            const dataCreate = {
                roleName: isRoleName,
                active: isActived,
                description: isDescription,
                permission: idPermissions,
                dashboard: idDashboards,
            }
            const { data, error } = await postCreateRoleAction(dataCreate);
            if (error) {
                console.error(error);
                setSnackbarMessage({ type: 'error', message: error.message });
                setOpenSnackbar(true);
                setIsLoading(false);
            }
            if (data) {
                setSnackbarMessage({ type: 'success', message: 'Create role successfully' });
                setOpenSnackbar(true);
                handleCloseModal();
            }
        } catch (error) {
            console.error(error)
            setSnackbarMessage({ type: 'error', message: 'Create error' });
            setOpenSnackbar(true);
            setIsLoading(false);
        }
    }

    return (
        <Modal open={open} onClose={handleCloseModal} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
            <Box sx={styleModalRole}>
                <Box sx={{ padding: '15px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography id="child-modal-title" sx={{ fontSize: '30px' }}>
                            Create Role
                        </Typography>
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Typography sx={{ mr: 2, minWidth: 100 }}>Role Name:</Typography>
                            <Input value={isRoleName} sx={{ flex: 1 }} onChange={handleRoleName} />
                            <FormControlLabel
                                label={<Typography>Active</Typography>}
                                control={<Switch checked={isActived} onChange={handleActive} />}
                                labelPlacement="start"
                            />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Typography sx={{ mr: 2, minWidth: 100 }}>Description:</Typography>
                            <Input value={isDescription} fullWidth sx={{ flex: 1 }} onChange={handleDescription} />
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ border: '1px solid #e2e2e2', p: 2 }}>
                        <Typography variant="h6">Dashboard</Typography>
                        <Divider sx={{ my: 2 }} />

                        {dashboardModuleNameList.map((moduleName) => (
                            <Box key={moduleName} sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <IconButton onClick={() => toggleExpandDashboardModule(moduleName)}>
                                            {expandedModulesDashboard[moduleName] ? <ExpandLess sx={expandRole} /> : <ExpandMore sx={expandRole} />}
                                        </IconButton>
                                        <Typography sx={expandRole}>{moduleName}</Typography>
                                    </Box>
                                    <Switch
                                        checked={dashboardGroupedPermissions[moduleName].every((perm) => selectedDashboardPermissions[moduleName]?.[perm._id])}
                                        onChange={() => handleDashboardModuleToggle(moduleName)}
                                    />
                                </Box>
                                {expandedModulesDashboard[moduleName] && (
                                    <>
                                        <Box sx={{ pl: 2, display: 'flex', flexWrap: 'wrap' }}>
                                            {dashboardGroupedPermissions[moduleName].map((permission) => {
                                                const { _id, method, permissionName, endpoint } = permission;
                                                const color = methodColors[method] || 'black';
                                                return (
                                                    <Box key={_id} sx={itemBoxMethod}>
                                                        <Switch
                                                            checked={selectedDashboardPermissions[moduleName]?.[_id] || false}
                                                            onChange={() => handleDashboardPermissionToggle(moduleName, _id)}
                                                        />
                                                        <Box>
                                                            <Typography>{permissionName}</Typography>
                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography variant="body2" sx={{ color: color, fontWeight: 1000, mr: 1 }}> {method} </Typography>
                                                                <Typography variant="body2">{endpoint}</Typography>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                    </>
                                )}
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ border: '1px solid #e2e2e2', p: 2 }}>
                        <Typography variant="h6">Permissions</Typography>
                        <Divider sx={{ my: 2 }} />

                        {moduleNameList.map((moduleName) => (
                            <Box key={moduleName} sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <IconButton onClick={() => toggleExpandModule(moduleName)}>
                                            {expandedModules[moduleName] ? <ExpandLess sx={expandRole} /> : <ExpandMore sx={expandRole} />}
                                        </IconButton>
                                        <Typography sx={expandRole}>{moduleName}</Typography>
                                    </Box>
                                    <Switch
                                        checked={groupedPermissions[moduleName].every((perm) => selectedPermissions[moduleName]?.[perm._id])}
                                        onChange={() => handleModuleToggle(moduleName)}
                                    />
                                </Box>

                                {expandedModules[moduleName] && (
                                    <>
                                        <Box sx={{ pl: 2, display: 'flex', flexWrap: 'wrap' }}>
                                            {groupedPermissions[moduleName].map((permission) => {
                                                const { _id, method, permissionName, endpoint } = permission;
                                                const color = methodColors[method] || 'black';
                                                return (
                                                    <Box key={_id} sx={itemBoxMethod}>
                                                        <Switch
                                                            checked={selectedPermissions[moduleName]?.[_id] || false}
                                                            onChange={() => handlePermissionToggle(moduleName, _id)}
                                                        />
                                                        <Box>
                                                            <Typography>{permissionName}</Typography>
                                                            <Box sx={{ display: 'flex' }}>
                                                                <Typography variant="body2" sx={{ color: color, fontWeight: 1000, mr: 1 }}> {method} </Typography>
                                                                <Typography variant="body2">{endpoint}</Typography>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                    </>
                                )}

                                <Divider sx={{ my: 2 }} />
                            </Box>
                        ))}
                    </Box>

                </Box>

                <Box sx={buttonCreateOrEditRole}>
                    {isLoading
                        ?
                        <Button variant="contained" disabled>
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        </Button>
                        : <Button variant="contained" onClick={handleSave}> Create </Button>}
                </Box>
            </Box>
        </Modal>
    );
}
