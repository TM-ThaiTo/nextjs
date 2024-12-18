
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MainPermissionPage from '@/components/dashboard/permission/main.permission';
import { getPermissionsNoGroupAction, getSearchPermissionAction } from '@/actions/permission/actions';
import UnauthorizedPage from '@/components/status-pages/Unthorization';
import { tablePermissions } from "@/constants/row_table";
import TablePaginationPermision from '@/components/dashboard/permission/pagination.permistions';
import { IPermission } from "@/types/dashboard";
import { cleanInput } from '@/helper/clear_input';
import NoData from '@/components/no-data/no-data';
import { PageDashboard } from '@/types/page';

export default async function PermissionPageDashboard({ searchParams }: PageDashboard) {
    const search = cleanInput(searchParams['search']?.toString() || '');
    const method = cleanInput(searchParams['method']?.toString() || '');
    const permissionModule = cleanInput(searchParams['module']?.toString() || '');
    const page = searchParams['page'] ?? '1';
    const per_page = searchParams['per_page'] ?? '5';

    var type = 0;
    var url = '';
    var permissions: IPermission[] = [];
    var _query = { total: 0, page: 0, limit: 0 };

    if (search || method || permissionModule) {
        const { data, error } = await getSearchPermissionAction(search.toString(), method.toString(), permissionModule.toString(), Number(page), Number(per_page));
        if (error && error.statusCode === 401) return <UnauthorizedPage />;
        if (data) {
            permissions = data.data.permissions;
            _query = data.data._query;
            type = 2;
            url = `search=${search}&method=${method}&module=${permissionModule}`;
        }
    } else {
        const { data, error } = await getPermissionsNoGroupAction(Number(page), Number(per_page));
        if (error && error.statusCode === 401) return <UnauthorizedPage />;

        if (data) {
            permissions = data.data.permissions;
            _query = data.data._query;
            type = 1;
            url = `page=${page}&per_page=${per_page}`;
        }
    }

    if (permissions.length === 0) return <NoData />

    return (
        <>
            <TableContainer sx={{ width: '100%', overflowX: 'auto', borderTop: '1px solid #e7e7e7', }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tablePermissions.map((permission) => (
                                <TableCell key={permission.id}
                                    align={permission.numeric ? "right" : "left"}
                                    padding={permission.disablePadding ? "none" : "normal"}
                                >
                                    {permission.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <MainPermissionPage permissions={permissions} />
                </Table>
            </TableContainer>
            <TablePaginationPermision
                total={_query?.total}
                page={_query?.page}
                limit={_query?.limit}
                type={type}
                url={url}
            />
        </>
    );
}