
import { getRoleAction, getSearchRoleAction } from "@/actions/role/actions";
import MainRoleComponent from "@/components/dashboard/role/main.role"
import { cleanInput } from "@/helper/clear_input";
import PaginationRole from "@/components/dashboard/role/pagination.role";
import { tableRoles } from '@/constants/row_table';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from "@mui/material/TableHead";
import UnauthorizedPage from "@/components/status-pages/Unthorization";
import { PageDashboard } from "@/types/page";
import NoData from "@/components/no-data/no-data";

export default async function RoleDashboardPage({ searchParams }: PageDashboard) {
    const search = cleanInput(searchParams['search']?.toString() || '');
    const roleName = cleanInput(searchParams['roleName']?.toString() || '');
    const active = cleanInput(searchParams['active']?.toString() || '');
    const page = searchParams['page'] ?? '1';
    const per_page = searchParams['per_page'] ?? '5';

    var roles: any[] = [];
    var _query = { total: 0, page: 0, limit: 0 };
    var type = 0;
    var url = '';

    if (search || roleName || active) {
        const { data, error } = await getSearchRoleAction(
            search.toString(),
            active.toString(),
            roleName.toString(),
            Number(page),
            Number(per_page)
        );
        if (error && error.statusCode === 401) return <UnauthorizedPage />
        if (data) {
            roles = data.data.roles;
            _query = data.data._query;
            type = 2;
            url = `search=${search}&roleName=${roleName}&active=${active}`;
        }
    } else {
        const { data, error } = await getRoleAction(Number(page), Number(per_page));
        if (error && error.statusCode === 401) return <UnauthorizedPage />
        if (data) {
            roles = data.data.roles;
            _query = data.data._query;
            type = 1;
            url = `page=${page}&per_page=${per_page}`;
        }
    }

    if (roles.length === 0) return <NoData />

    return (
        <>
            <TableContainer sx={{ width: '100%', overflowX: 'auto', borderTop: '1px solid #e7e7e7', }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableRoles.map((permission) => (
                                <TableCell key={permission.id}
                                    align={permission.numeric ? "right" : "left"}
                                    padding={permission.disablePadding ? "none" : "normal"}
                                >
                                    {permission.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <MainRoleComponent dataRole={roles} />
                </Table>
            </TableContainer>
            <PaginationRole
                total={_query?.total}
                page={_query?.page}
                limit={_query?.limit}
                type={type}
                url={url}
            />
        </>
    )
}