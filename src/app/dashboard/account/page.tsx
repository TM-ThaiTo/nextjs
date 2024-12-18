import MainAccountDashboard from "@/components/dashboard/account/main.account";
import Box from '@mui/material/Box';
import { cleanInput } from "@/helper/clear_input";
import { tableAccounts } from '@/constants/row_table';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from "@mui/material/TableHead";
import UnauthorizedPage from "@/components/status-pages/Unthorization";
import { PageDashboard } from "@/types/page";
import PaginationAccount from "@/components/dashboard/account/pagination.account";
import { getAllAccountAction, getSearchAccountAction } from "@/actions/account/actions";
import NoData from "@/components/no-data/no-data";

export default async function AccountDashboardPage({ searchParams }: PageDashboard) {
    const search = cleanInput(searchParams['search']?.toString() || '');
    const typeAccount = cleanInput(searchParams['type']?.toString() || '');
    const roleName = cleanInput(searchParams['roleName']?.toString() || '');
    const page = searchParams['page'] ?? '1';
    const per_page = searchParams['per_page'] ?? '5';

    var accounts: any[] = [];
    var _query = { total: 0, page: 0, limit: 0 };
    var type = 0;
    var url = '';

    if (search || typeAccount || roleName) {
        const { data, error } = await getSearchAccountAction(search, typeAccount, roleName, Number(page), Number(per_page));
        if (error && error.statusCode === 401) return <UnauthorizedPage />
        if (data) {
            _query = data?.data?._query;
            accounts = data?.data?.accounts;
            type = 1;
            url = `search=${search}&type=${typeAccount}&roleName=${roleName}&page=${page}&per_page=${per_page}`;
        }
    } else {
        const { data, error } = await getAllAccountAction(Number(page), Number(per_page))
        if (error && error.statusCode === 401) return <UnauthorizedPage />
        if (data) {
            _query = data?.data?._query;
            accounts = data?.data?.accounts;
            type = 1;
            url = `page=${page}&per_page=${per_page}`;
        }
    }
    if (accounts?.length === 0) return <NoData />

    return (
        <Box sx={{ padding: '20px' }}>
            <TableContainer sx={{ width: '100%', overflowX: 'auto', borderTop: '1px solid #e7e7e7', }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableAccounts.map((item) => (
                                <TableCell
                                    key={item?.id as string}
                                    align={item?.numeric ? "right" : "left"}
                                    padding={item?.disablePadding ? "none" : "normal"}
                                    sx={{ maxWidth: item?.maxWidth ? item?.maxWidth : 'auto' }}
                                >
                                    {item?.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <MainAccountDashboard data={accounts} />
                </Table>
            </TableContainer>
            <PaginationAccount total={_query?.total} page={_query?.page} limit={_query?.limit} type={type} url={url} />
        </Box>
    )
}