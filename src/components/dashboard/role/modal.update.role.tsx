import React, { useState, useEffect, useCallback } from 'react';
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
import { getRoleByIdAction, putUpdateRoleAction } from '@/actions/role/actions';
import { getPermissionsAction, getPermissionWithDashboardAction } from '@/actions/permission/actions';
import useSnackbar from '@/utils/hooks/snackbar/useSnackbar';

type Props = { open: boolean; onClose: () => void; id: string; };

export default function ModalUpdateRole({ open, onClose, id }: Props) {
    const { setOpenSnackbar, setSnackbarMessage } = useSnackbar();

    const [isDashboards, setDashboards] = useState<IPermissions>({ moduleNameList: [], groupedPermissions: {} });
    const [selectedDashboardPermissions, setSelectedDashboardPermissions] = useState<{ [moduleName: string]: { [permissionId: string]: boolean }; }>({});
    const [expandedDashboardModules, setExpandedDashboardModules] = useState<{ [moduleName: string]: boolean; }>({});

    const [isPermissions, setPermissions] = useState<IPermissions>({ moduleNameList: [], groupedPermissions: {} });
    const [selectedPermissions, setSelectedPermissions] = useState<{ [moduleName: string]: { [permissionId: string]: boolean }; }>({});
    const [expandedModules, setExpandedModules] = useState<{ [moduleName: string]: boolean; }>({});

    const [isActived, setIsActived] = useState<boolean>(false);
    const [isRoleName, setIsRoleName] = useState<string>('');
    const [isDescription, setIsDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getRoleById = useCallback(async () => {
        try {
            const { data, error } = await getRoleByIdAction(id);
            if (error) { console.error(error); return; }
            if (data) return data.data;
        } catch (error) { console.error(error); }
    }, [id])
    const getPermissions = async () => {
        try {
            const { data, error } = await getPermissionsAction();
            if (error) { console.error(error); return; }
            if (data) {
                setPermissions(data.data);
                return data.data;
            }
        } catch (error) { console.error(error); }
    }
    const getDashboards = async () => {
        try {
            const { data, error } = await getPermissionWithDashboardAction();
            if (error) { console.error(error); return; }
            if (data) {
                setDashboards(data.data);
                return data.data;
            }
        } catch (error) { console.error(error); }
    }
    const updateAndMapData = (dataNew: IRole, permissionsNew: IPermissions, dataDashboardsNew: IPermissions) => {
        const roleData = dataNew;
        const { moduleNameList, groupedPermissions } = permissionsNew;
        const { moduleNameList: dashboardModuleNameList, groupedPermissions: dashboardGroupedPermissions } = dataDashboardsNew;
        if (roleData) {
            const { roleName, active, description, permission, dashboard } = roleData;
            setIsActived(active);
            setIsRoleName(roleName);
            setIsDescription(description);

            const initialPermissions: { [moduleName: string]: { [permissionId: string]: boolean } } = {};
            moduleNameList.forEach((moduleName) => {
                initialPermissions[moduleName] = {};
                groupedPermissions[moduleName].forEach((perm) => {
                    initialPermissions[moduleName][perm._id] = permission.includes(perm._id);
                });
            });
            setSelectedPermissions(initialPermissions);

            const initialDashboardPermissions: { [moduleName: string]: { [permissionId: string]: boolean } } = {};
            dashboardModuleNameList.forEach((moduleName) => {
                initialDashboardPermissions[moduleName] = {};
                dashboardGroupedPermissions[moduleName].forEach((perm) => {
                    initialDashboardPermissions[moduleName][perm._id] = dashboard.includes(perm._id);
                });
            });
            setSelectedDashboardPermissions(initialDashboardPermissions);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const dataRole = await getRoleById(); // Wait for getRoleById to finish
                const dataPermissions = await getPermissions(); // Wait for getPermissions to finish
                const dataDashboards = await getDashboards(); // Wait for getDashboards to finish
                if (dataRole && dataPermissions && dataDashboards) updateAndMapData(dataRole, dataPermissions, dataDashboards);
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setIsLoading(false); // End loading after both requests finish
            }
        };

        if (open) {
            fetchData();
        } else {
            setPermissions({ moduleNameList: [], groupedPermissions: {} });
        }
    }, [open, id, getRoleById]);

    const handleActive = (e: React.ChangeEvent<HTMLInputElement>) => setIsActived(e.target.checked);
    const handleRoleName = (e: React.ChangeEvent<HTMLInputElement>) => setIsRoleName(e.target.value);
    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => setIsDescription(e.target.value);

    const handleDashboardModuleToggle = (moduleName: string) => {
        const { moduleNameList, groupedPermissions } = isDashboards;
        const allSelected = groupedPermissions[moduleName].every((perm) => selectedDashboardPermissions[moduleName]?.[perm._id]);

        const updatedModulePermissions = groupedPermissions[moduleName].reduce((acc, perm) => {
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
        setExpandedDashboardModules((prevState) => ({
            ...prevState,
            [moduleName]: !prevState[moduleName],
        }));
    }

    const handleModuleToggle = (moduleName: string) => {
        const { moduleNameList, groupedPermissions } = isPermissions;
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

    const renderDashboardPermissions = () => {
        const { moduleNameList, groupedPermissions } = isDashboards;
        return (
            <>
                <Box sx={{ border: '1px solid #e2e2e2', p: 2 }}>
                    <Typography variant="h6">Dashboard</Typography>
                    <Divider sx={{ my: 2 }} />

                    {moduleNameList.map((moduleName) => (
                        <Box key={moduleName} sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <IconButton onClick={() => toggleExpandDashboardModule(moduleName)}>
                                        {expandedDashboardModules[moduleName] ? <ExpandLess sx={expandRole} /> : <ExpandMore sx={expandRole} />}
                                    </IconButton>
                                    <Typography sx={expandRole}>{moduleName}</Typography>
                                </Box>
                                <Switch
                                    checked={groupedPermissions[moduleName].every((perm) => selectedDashboardPermissions[moduleName]?.[perm._id])}
                                    onChange={() => handleDashboardModuleToggle(moduleName)}
                                />
                            </Box>

                            {expandedDashboardModules[moduleName] && (
                                <>
                                    <Box sx={{ pl: 2, display: 'flex', flexWrap: 'wrap' }}>
                                        {groupedPermissions[moduleName].map((permission) => {
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
                            <Divider sx={{ my: 2 }} />
                        </Box>
                    ))}
                </Box>
            </>
        )
    }
    const renderPermissions = () => {
        const { moduleNameList, groupedPermissions } = isPermissions;
        return (
            <>
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
            </>
        )
    }

    const handleCloseModal = () => {
        setIsLoading(false);
        setIsRoleName('');
        setIsActived(false);
        setIsDescription('');
        setSelectedPermissions({});
        setExpandedModules({});
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

            const idDashboardPermissions = Object.values(selectedDashboardPermissions).reduce((acc, module) => {
                const permissions = Object.entries(module)
                    .filter(([, value]) => value)
                    .map(([permissionId]) => permissionId);
                return [...acc, ...permissions];
            }, [] as string[])

            const dataUpdate = {
                id: id,
                roleName: isRoleName,
                active: isActived,
                description: isDescription,
                permission: idPermissions,
                dashboard: idDashboardPermissions,
            }
            const { data, error } = await putUpdateRoleAction(dataUpdate);

            if (error) {
                console.log(error);
                setSnackbarMessage({ type: 'error', message: error.message });
                setOpenSnackbar(true);
                setIsLoading(false);
            }
            if (data) {
                setSnackbarMessage({ type: 'success', message: 'Update role successfully' });
                setOpenSnackbar(true);
                handleCloseModal();
            }
        } catch (error) {
            console.log(error)
            setSnackbarMessage({ type: 'error', message: 'Update error' });
            setOpenSnackbar(true);
            setIsLoading(false);
        }
    }

    return (
        <Modal open={open} onClose={handleCloseModal} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
            <Box sx={styleModalRole}>
                {isLoading
                    ? <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Box>
                    : (
                        <>
                            <Box sx={{ padding: '15px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Typography id="child-modal-title" sx={{ fontSize: '30px' }}> Update Role </Typography>
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
                                {renderDashboardPermissions()}
                                {renderPermissions()}
                            </Box>
                            <Box sx={buttonCreateOrEditRole}>
                                <Button variant="contained" onClick={handleSave}> Update </Button>
                            </Box>
                        </>
                    )}
            </Box>
        </Modal>
    );
}
