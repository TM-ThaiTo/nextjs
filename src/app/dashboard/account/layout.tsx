import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SearchAndFilterAccountDashboard from '@/components/dashboard/account/searchAndFilter.account'
import TopTableAccount from "@/components/dashboard/account/top.table.account";

export default function LayoutAccountDashboard({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ width: '100%', paddingLeft: '10px', paddingRight: '10px' }}>
            <SearchAndFilterAccountDashboard />
            <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 'none' }}>
                <TopTableAccount />
                {children}
            </Paper>
        </Box>
    )
}