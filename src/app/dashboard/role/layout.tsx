import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { getRoleNameAction } from "@/actions/role/actions";
import UnauthorizedPage from "@/components/status-pages/Unthorization";
import SearchAndFilterRole from "@/components/dashboard/role/searchAndFilter.role";
import { getPermissionsAction, getPermissionWithDashboardAction } from "@/actions/permission/actions";
import TopTableRole from "@/components/dashboard/role/top.table.role";

export default async function LayoutRolePageDashboar({ children }: { children: React.ReactNode }) {

    const { data, error } = await getRoleNameAction();
    if (error && error.statusCode === 401) return <UnauthorizedPage />
    const roleNames = data?.data || [];
    const { data: dataP, error: errorP } = await getPermissionsAction();
    const { data: dataDB, error: errorDB } = await getPermissionWithDashboardAction();

    if ((errorP && errorP.statusCode === 401) || (errorDB && errorDB.statusCode === 401)) return <UnauthorizedPage />

    return (
        <Box sx={{ width: '100%', paddingLeft: '10px', paddingRight: '10px' }}>
            <SearchAndFilterRole roleNames={roleNames} />
            <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
                <TopTableRole permissions={dataP?.data} dashboards={dataDB?.data} />
                {children}
            </Paper>
        </Box>
    )
}