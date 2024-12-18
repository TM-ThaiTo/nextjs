import { getModulesAndMethodsNameAction } from "@/actions/permission/actions";
import SearchAndFilterPermission from "@/components/dashboard/permission/searchAndFilter.permission";
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import TopTablePermission from "@/components/dashboard/permission/top.table.permission";
import UnauthorizedPage from "@/components/status-pages/Unthorization";

export default async function LayoutPermissionPage({ children }: { children: React.ReactNode }) {
    const { data, error } = await getModulesAndMethodsNameAction();
    if (error && error.statusCode === 401) return <UnauthorizedPage />

    const { modules, methods } = data?.data || { modules: [], methods: [] };
    return (
        <Box sx={{ width: '100%', paddingLeft: '10px', paddingRight: '10px' }}>
            <SearchAndFilterPermission modules={modules} methods={methods} />
            <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
                <TopTablePermission modules={modules} />
                {children}
            </Paper>
        </Box>
    )
}