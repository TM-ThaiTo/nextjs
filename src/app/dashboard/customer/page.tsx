import { getAllCustomerAction, getSearchCustomerActions } from "@/actions/customer/actions.admin";
import MainPageCustomer from "@/components/dashboard/customer/main_customer";
import NoData from "@/components/no-data/no-data";
import UnauthorizedPage from "@/components/status-pages/Unthorization";
import { PageDashboard } from "@/types/page";
import { cleanInput } from "@/helper/clear_input";
import PaginationRole from "@/components/dashboard/role/pagination.role";
import { tableCustomers } from '@/constants/row_table';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";

export default async function CustomerPage({ searchParams }: PageDashboard) {

    const search = searchParams['search']?.toString() || '';
    const follower = cleanInput(searchParams['follower']?.toString() || '');
    const following = cleanInput(searchParams['following']?.toString() || '');
    const post = cleanInput(searchParams['post']?.toString() || '');
    const report = cleanInput(searchParams['report']?.toString() || '');
    const page = searchParams['page'] ?? '1';
    const per_page = searchParams['per_page'] ?? '5';

    var users: any[] = [];
    var _query = { total: 0, page: 0, limit: 0 };
    var type = 0;
    var url = '';

    if (search || follower || following || post || report) {
        const { data, error } = await getSearchCustomerActions(search, follower, following, post, report, Number(page), Number(per_page));
        if (error && error.statusCode === 401) return <UnauthorizedPage />
        if (data) {
            _query = data?.data?._query;
            users = data?.data?.users;
            type = 1;
            url = `search=${search}&follower=${follower}&following=${following}&post=${post}&report=${report}&page=${page}&per_page=${per_page}`;
        }
    } else {
        const { data, error } = await getAllCustomerAction(Number(page), Number(per_page));
        if (error && error.statusCode === 401) return <UnauthorizedPage />
        if (data) {
            _query = data?.data?._query;
            users = data?.data?.users;
            type = 1;
            url = `page=${page}&per_page=${per_page}`;
        }
    }
    if (!users || users?.length === 0) return <NoData />

    return (
        <>
            <TableContainer sx={{ width: '100%', overflowX: 'auto', borderTop: '1px solid #e7e7e7', }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableCustomers.map((permission) => (
                                <TableCell
                                    key={permission.id}
                                    align={permission.numeric ? "right" : "left"}
                                    padding={permission.disablePadding ? "none" : "normal"}
                                >
                                    {permission.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <MainPageCustomer data={users} />
                </Table>
            </TableContainer>

            {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]} component="div" count={data.length}
                    rowsPerPage={rowsPerPage} page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
        </>

    )
}